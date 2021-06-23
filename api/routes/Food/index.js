const express = require('express');
const router = express.Router({ mergeParams: true });
const FoodController = require('../../controllers/Food/index');
const { authenticate, protected } = require('../../middleware');



router.get('/category',authenticate, protected, FoodController.getCategories)
router.post('/category',authenticate, protected, FoodController.addCategory)
router.put('/category/:id',authenticate, protected, FoodController.editCategory)
router.delete('/category/:id',authenticate, protected, FoodController.deleteCategory)




module.exports = router