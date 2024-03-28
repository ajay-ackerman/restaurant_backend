// restaurantRoutes.js
const express = require('express');
const restaurantController = require('../controllers/restaurantController');

const router = express.Router();

router.get('/', restaurantController.getAllRestaurants)
.post('/', restaurantController.createRestaurant)
.put('/:id', restaurantController.updateRestaurant)
.delete('/:id', restaurantController.deleteRestaurant)
.post('/:id/menu', restaurantController.addMenuItem)
.delete('/:restaurantId/menu/:menuItemId', restaurantController.deleteMenuItem)
.get('/rank', restaurantController.rankRestaurants)
.post('/rate', restaurantController.rateRestaurant)
.post('/floors', restaurantController.createFloor)
.get('/floors', restaurantController.getAllFloors)
.patch('/restaurants/:restaurantId/floors/:floorId/tables/:tableId/reserve', restaurantController.updateTableReservation);

module.exports = router;
