const Comment = require('../models/Comment');
const Food = require('../models/Food'); // Giả sử bạn sẽ có Food model
const User = require('../models/User');

// Lấy tất cả bình luận cho một món ăn
exports.getCommentsForFood = async (req, res) => {
    try {
        const comments = await Comment.find({ food: req.params.foodId })
            .populate('user', ['username', 'avatar']) // Lấy thêm username và avatar của người dùng
            .sort({ createdAt: -1 }); // Sắp xếp mới nhất lên đầu
        res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Thêm một bình luận mới
exports.addComment = async (req, res) => {
    const { text } = req.body;

    try {
        const user = await User.findById(req.user.id);
        const food = await Food.findById(req.params.foodId);

        if (!food) {
            return res.status(404).json({ msg: 'Food not found' });
        }

        const newComment = new Comment({
            text,
            user: req.user.id,
            food: req.params.foodId,
        });

        const comment = await newComment.save();
        res.json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};