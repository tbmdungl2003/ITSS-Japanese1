const FOOD_DATA_BY_LOCATION = require('../data/foodData.js'); // Đường dẫn đã đúng

const getFoods = async (req, res) => {
    try {

        res.json(FOOD_DATA_BY_LOCATION);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const getFoodById = (req, res) => {

    const allItems = Object.values(FOOD_DATA_BY_LOCATION).flatMap(loc => loc.items);
    const food = allItems.find(item => item._id === req.params.id);

    if (food) {
        res.json(food);
    } else {
        res.status(404).json({ msg: 'Food not found' });
    }
};

module.exports = { getFoods, getFoodById };