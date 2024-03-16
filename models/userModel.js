// userModel.js
const { timeStamp } = require('console');
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  date: Date,
  tableNumber: Number
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  reservations: [reservationSchema] // Adding reservations field
},{timeStamp: true});

const User = mongoose.model('User', userSchema);
module.exports = User;