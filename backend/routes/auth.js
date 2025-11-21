const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { register, login, getLoggedInUser, updateUserProfile } = require('../controllers/authController.js');
const authMiddleware = require('../middleware/auth.js');
const { check } = require('express-validator');

// --- Cấu hình Multer để lưu trữ file ảnh ---
const storage = multer.diskStorage({
  destination: './uploads/', // Thư mục lưu file
  filename: function (req, file, cb) {
    // Tạo tên file duy nhất: fieldname-timestamp.ext
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 }, // Giới hạn kích thước file 2MB
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Chỉ cho phép tải lên file ảnh!');
    }
  },
}).single('avatar'); // 'avatar' là tên của field trong form-data

// @route   GET api/auth
// @desc    Get logged in user (Lấy thông tin người dùng đã đăng nhập)
// @access  Private (Cần token)
router.get('/', authMiddleware, getLoggedInUser);

// @route   POST api/auth/register
// @desc    Register a user (Đăng ký người dùng)
// @access  Public
router.post(
  '/register',
  [
    // Các quy tắc validation từ express-validator
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  register
);
router.post(
  '/login',
  [ // Thêm validation cho login
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login
);

// @route   PUT api/auth/profile
// @desc    Update user profile (Cập nhật hồ sơ người dùng)
// @access  Private
router.put('/profile', authMiddleware, upload, updateUserProfile);


module.exports = router;
