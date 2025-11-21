const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.js');
const { getCommentsForFood, addComment } = require('../controllers/commentController');

// @route   GET api/comments/:foodId
// @desc    Lấy tất cả bình luận cho một món ăn
// @access  Public
router.get('/:foodId', getCommentsForFood);

// @route   POST api/comments/:foodId
// @desc    Thêm một bình luận mới cho một món ăn
// @access  Private (Yêu cầu đăng nhập)
router.post('/:foodId', authMiddleware, addComment);

module.exports = router;