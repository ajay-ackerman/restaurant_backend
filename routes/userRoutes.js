// userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getAllUsers)
.post('/', userController.createUser)
.put('/:id', userController.updateUser)
.delete('/:id', userController.deleteUser);

module.exports = router;
