// userModel.js
const { timeStamp } = require('console');
const mongoose = require('mongoose');
const { Restaurant } = require('./restaurantModel');

const reservationSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  date: Date,
  tableNumber: Number
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Add role field
  reservations: [reservationSchema],
  favourites :  [Restaurant] // Adding reservations field
},{timeStamp: true});

const User = mongoose.model('User', userSchema);
module.exports = User;