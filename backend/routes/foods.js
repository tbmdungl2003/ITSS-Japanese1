const express = require('express');
const router = express.Router();
const { getFoods, getFoodById } = require('../controllers/foodController.js');

// @route   GET /api/foods
// @desc    Get all food data
// @access  Public
router.get('/', getFoods);
router.get('/:id', getFoodById);
module.exports = router;