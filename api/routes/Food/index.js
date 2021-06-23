const express = require('express');
const router = express.Router({ mergeParams: true });
const FoodController = require('../../controllers/Food/index');
const { authenticate, protected } = require('../../middleware');



router.post('/category/add',authenticate, protected, FoodController.addCategory)



module.exports = router