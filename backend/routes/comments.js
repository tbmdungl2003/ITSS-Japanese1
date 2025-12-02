const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getCommentsByFoodId, addComment } = require('../controllers/commentController');

router.get('/:foodId', getCommentsByFoodId);
router.post('/:foodId', auth, addComment);

module.exports = router;