// reservationController.js
const Reservation = require('../models/reservationModel');
const Restaurant = require('../models/restaurantModel');
const User = require('../models/userModel');

exports.createReservation = async (req, res) => {
  try {
    const { userId, restaurantId } = req.body;

    // Create reservation
    const reservation = new Reservation(req.body);
    await reservation.save();

    // Update restaurant reservations
    await Restaurant.findByIdAndUpdate(restaurantId, { $push: { reservations: reservation } });

    // Update user reservations
    await User.findByIdAndUpdate(userId, { $push: { reservations: reservation } });

    res.json(reservation);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('user').populate('restaurant');
    res.json(reservations);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id).populate('user').populate('restaurant');
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByIdAndUpdate(id, req.body, { new: true });
    res.json(reservation);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    await Reservation.findByIdAndDelete(id);
    res.json({ message: 'Reservation deleted successfully' });
  } catch (err) {
    res.status(400).send(err);
  }
};
