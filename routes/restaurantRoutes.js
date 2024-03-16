// restaurantRoutes.js
const express = require('express');
const restaurantController = require('../controllers/restaurantController');

const router = express.Router();

router.get('/', restaurantController.getAllRestaurants)
.post('/', restaurantController.createRestaurant)
.put('/:id', restaurantController.updateRestaurant)
.delete('/:id', restaurantController.deleteRestaurant)
.post('/:id/menu', restaurantController.addMenuItem)
.delete('/:restaurantId/menu/:menuItemId', restaurantController.deleteMenuItem);

module.exports = router;
