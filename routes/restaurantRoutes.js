// restaurantRoutes.js
const express = require('express');
const restaurantController = require('../controllers/restaurantController');
const { restaurantSignUp, restaurantSignIn } = require('../controllers/authController');
const { authenticateUser, authorizeUser, authorizeRestaurantOwner } = require('../middleWear/authMiddleware');

const router = express.Router();

router.post('/signup',restaurantSignUp)
.post('/signin', restaurantSignIn)
.get('/', authenticateUser , restaurantController.getAllRestaurants)
.post('/signup',authenticateUser,authorizeRestaurantOwner, restaurantController.createRestaurant)
.put('/:id',authenticateUser,authorizeRestaurantOwner, restaurantController.updateRestaurant)
.delete('/:id', authenticateUser,authorizeRestaurantOwner,restaurantController.deleteRestaurant)
.post('/:id/menu',authenticateUser,authorizeRestaurantOwner, restaurantController.addMenuItem)
.delete('/:restaurantId/menu/:menuItemId',authenticateUser,authorizeRestaurantOwner, restaurantController.deleteMenuItem)
.get('/rank',authenticateUser, restaurantController.rankRestaurants)
.post('/rate', authenticateUser,authorizeUser,restaurantController.rateRestaurant)
.post('/floors',authenticateUser,authorizeRestaurantOwner, restaurantController.createFloor)
.get('/floors',authenticateUser, restaurantController.getAllFloors)
.patch('/restaurants/:restaurantId/floors/:floorId/tables/:tableId/reserve',authenticateUser, restaurantController.updateTableReservation);

module.exports = router;
