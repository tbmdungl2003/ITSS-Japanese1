const FOOD_DATA_BY_LOCATION = require('../data/foodData.js');

const User = {
    _id: '60c72b2f9b1d8c001f8e4d00', // ID giả
    username: 'CurrentUser',
    avatar: '/uploads/default-avatar.png'
};

const getCommentsByFoodId = (req, res) => {
    try {
        const foodId = req.params.foodId;
        const allItems = Object.values(FOOD_DATA_BY_LOCATION).flatMap(loc => loc.items);
        const food = allItems.find(item => String(item.id) == foodId); 
        if (food && food.comments) {       
            const formattedComments = food.comments.map(comment => ({
                _id: String(comment.id), 
                text: comment.text,
                createdAt: comment.date,
                user: { 
                    username: comment.user,
                    avatar: comment.avatar
                }
            }));
            res.json(formattedComments.reverse()); 
        } else {
            res.json([]); 
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const addComment = (req, res) => {
    try {
        const newCommentData = {
            _id: new Date().getTime().toString(), 
            text: req.body.text,
            createdAt: new Date().toISOString(),
            user: { 
                username: req.user.name || req.user.username, 
                avatar: req.user.avatar
            }
        };

        res.status(201).json(newCommentData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { getCommentsByFoodId, addComment };