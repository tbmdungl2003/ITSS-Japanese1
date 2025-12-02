const express = require('express');
const router = express.Router();
const {getStoreInformation, getStoreById}=require('../controllers/storeController.js');

router.get('/',getStoreInformation);
router.get('/:id', getStoreById); 
module.exports = router;