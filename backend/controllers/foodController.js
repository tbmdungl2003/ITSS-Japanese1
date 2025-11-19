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

exports.getFoodById = (req, res) => {
    const { id } = req.params; // Lấy id từ URL

    // Tìm kiếm món ăn trong tất cả các thành phố
    let foundFood = null;
    for (const city in FOOD_DATA_BY_LOCATION) {
        const food = FOOD_DATA_BY_LOCATION[city].items.find(item => item.id.toString() === id);
        if (food) {
            foundFood = food;
            break;
        }
    }

    if (foundFood) {
        res.json(foundFood);
    } else {
        res.status(404).json({ msg: 'Food not found' });
    }
};
