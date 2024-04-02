// reservationModel.js
const { Table } = require('./models/restaurantModel');
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  tables : [Table],
  date: Date,
},{timeStamp: true});

const Reservation= mongoose.model('Reservation', reservationSchema);
module.exports = Reservation
