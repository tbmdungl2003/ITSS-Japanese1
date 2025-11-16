const express = require('express');
const router = express.Router();
const { getFoods } = require('../controllers/foodController.js');

// @route   GET /api/foods
// @desc    Get all food data
// @access  Public
router.get('/', getFoods);

module.exports = router;