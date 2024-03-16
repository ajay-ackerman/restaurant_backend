const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  isSpecial: Boolean
});

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  tableNumber: Number
});

const restaurantSchema = new mongoose.Schema({
  name: String,
  tables: Number,
  menu: [menuSchema], // Adding menu field
  reservations: [reservationSchema]
});
module.exports = Restaurant;