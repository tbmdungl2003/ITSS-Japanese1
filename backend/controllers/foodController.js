const FOOD_DATA_BY_LOCATION = require('../data/foodData.js'); // Đường dẫn đã đúng

const getFoods = async (req, res) => {
    try {
        // Tạo bản sao để không thay đổi dữ liệu gốc
        const dataCopy = JSON.parse(JSON.stringify(FOOD_DATA_BY_LOCATION));

        // "Dịch" từ 'id' sang '_id' để tương thích với frontend
        for (const locationKey in dataCopy) {
            dataCopy[locationKey].items = dataCopy[locationKey].items.map(item => {
                item._id = String(item.id);
                return item;
            });
        }
        res.json(dataCopy);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const getFoodById = (req, res) => {
    const allItems = Object.values(FOOD_DATA_BY_LOCATION).flatMap(loc => loc.items);
    const food = allItems.find(item => String(item.id) === req.params.id);

    if (food) {
        const foodCopy = { ...food, _id: String(food.id) };
        res.json(foodCopy);
    } else {
        res.status(404).json({ msg: 'Food not found' });
    }
};

module.exports = { getFoods, getFoodById };