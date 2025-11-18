const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Logic đăng ký
exports.register = async (req, res) => {
  // 1. Kiểm tra kết quả validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    // 2. Kiểm tra xem user đã tồn tại chưa
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // 3. Tạo user mới
    user = new User({
      username,
      email,
      password,
    });

    // 4. Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // 5. Lưu user vào DB
    await user.save();

    // 6. Trả về token (tương tự login) để user có thể đăng nhập ngay
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' }, // Token hết hạn sau 5 giờ
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Logic đăng nhập
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Kiểm tra email có tồn tại không
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // 2. So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // 3. Nếu đúng, tạo và trả về token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        // Trả về cả token và thông tin người dùng (trừ mật khẩu)
        // Lấy toàn bộ thông tin người dùng (trừ mật khẩu) để đảm bảo tính nhất quán
        const userToReturn = user.toObject();
        delete userToReturn.password;
        res.json({ token, user: userToReturn });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Logic lấy thông tin người dùng đã đăng nhập
exports.getLoggedInUser = async (req, res) => {
  try {
    // req.user.id được lấy từ middleware
    const user = await User.findById(req.user.id).select('-password'); // Lấy user nhưng bỏ qua password
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Logic cập nhật thông tin người dùng
exports.updateUserProfile = async (req, res) => {
    // Lấy các trường có thể cập nhật từ request body
    const { username, dob, gender, phone, introduction } = req.body;

    // Xây dựng đối tượng chứa các trường cần cập nhật
    const profileFields = {};
    // Chỉ thêm vào đối tượng nếu giá trị tồn tại (hoặc là chuỗi không rỗng)
    if (username) profileFields.username = username; 
    if (dob) profileFields.dob = dob; 
    if (gender) profileFields.gender = gender;
    if (phone) profileFields.phone = phone;
    if (introduction) profileFields.introduction = introduction;

    try {
        // 🛑 SỬA LỖI TRUY CẬP ID: Dùng req.user.id hoặc req.user.userId tùy theo JWT payload
        const userId = req.user.id || req.user.userId;

        let user = await User.findByIdAndUpdate(
            userId,
            { $set: profileFields },
            { new: true } 
        ).select('-password'); 

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user); // Trả về thông tin người dùng đã được cập nhật
    } catch (err) {
        console.error(err.message);
        // Lỗi validation Mongoose hoặc lỗi server
        res.status(500).send('Server Error');
    }
};
