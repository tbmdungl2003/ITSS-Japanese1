const FOOD_DATA_BY_LOCATION = require('../data/foodData.js'); // Đường dẫn đã đúng

// @desc    Get all food data
// @route   GET /api/foods
// @access  Public
exports.getFoods = async (req, res) => {
    try {
        // Sau này, bạn có thể thay thế dòng này bằng logic lấy dữ liệu từ database
        res.json(FOOD_DATA_BY_LOCATION);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};