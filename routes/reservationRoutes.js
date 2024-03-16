// reservationRoutes.js
const express = require('express');
const reservationController = require('../controllers/reservationController');

const router = express.Router();

router.get('/', reservationController.getAllReservations)
.post('/', reservationController.createReservation)
.put('/:id', reservationController.updateReservation)
.delete('/:id', reservationController.deleteReservation);

module.exports = router;
