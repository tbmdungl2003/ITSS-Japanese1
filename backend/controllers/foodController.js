const Food = require('../models/Food');
exports.getFoods = async (req, res) => {
    try {
        // Lấy tất cả món ăn từ database
        const foods = await Food.find({});
        const groupedByLocation = foods.reduce((acc, food) => {
            const { location } = food; 
            if (!acc[location]) {
                acc[location] = { name: location, items: [] }; // Tạm thời dùng key làm name
            }
            acc[location].items.push(food);
            return acc;
        }, {});

        res.json(groupedByLocation);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getFoodById = async (req, res) => {
    const { id } = req.params; // Lấy id từ URL
    const food = await Food.findById(id);
    if (!food) return res.status(404).json({ msg: 'Food not found' });
    res.json(food);
};
