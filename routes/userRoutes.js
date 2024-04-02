// userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const { signUp , signIn } = require('../controllers/authController');
const { authenticateUser, authorizeUser, authorizeRestaurantOwner } = require('../middleWear/authMiddleware');

const router = express.Router();

router.get('/', authenticateUser,userController.getAllUsers)
.post('/signup', signUp)
.post('/signin', signIn)
.put('/:id',authenticateUser,authorizeUser, userController.updateUser)
.delete('/:id', authenticateUser,authorizeUser,userController.deleteUser)
.post('/:userId/fav/:restaurantId', authenticateUser,authorizeUser, userController.addToFavorites)
.delete('/:userId/fav/:restaurantId', authenticateUser,authorizeUser, userController.removeFromFavorites);;

module.exports = router;
