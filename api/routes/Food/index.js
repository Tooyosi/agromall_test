const express = require('express');
const router = express.Router({ mergeParams: true });
const FoodController = require('../../controllers/Food/index');
const { authenticate, protected } = require('../../middleware');


// category routes
router.get('/category',authenticate, protected, FoodController.getCategories)
router.post('/category',authenticate, protected, FoodController.addCategory)
router.put('/category/:id',authenticate, protected, FoodController.editCategory)
router.delete('/category/:id',authenticate, protected, FoodController.deleteCategory)

// market routes
router.get('/market', authenticate, protected, FoodController.getAllMarkets)
router.post('/market', authenticate, protected, FoodController.addMarket)
router.patch('/market/:id', authenticate, protected, FoodController.editMarket)
router.get('/market/:id', authenticate, protected, FoodController.getSingleMarket)
router.delete('/market/:id', authenticate, protected, FoodController.deleteMarket)



module.exports = router