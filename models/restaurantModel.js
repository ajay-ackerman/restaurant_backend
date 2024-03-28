// restaurantModel.js
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

const tableSchema = new mongoose.Schema({
  // tableId: { type: String, unique: true },
  // number: Number,
  numberOfSeats: Number,
  isReserved: { type: Boolean, default: false }
});

const floorSchema = new mongoose.Schema({
  floorNumber: Number,
  tables: [tableSchema]
});

// const restaurantSchema = new mongoose.Schema({
//   name: String,
//   address: String, // Adding address field
//   tables: Number,
//   menu: [menuSchema],
//   reservations: [reservationSchema]
// });

//newly added rating
const restaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  floors: [floorSchema], // Reference to floors collection
  menu: [menuSchema],
  ratings: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, rating: Number }], // Update ratings schema
  averageRating: Number,
  reservations: [reservationSchema]
});



const Restaurant = mongoose.model('Restaurant', restaurantSchema);
const  Floor = mongoose.model('Floor', floorSchema);
module.exports = { Restaurant, Floor };
// module.exports = Restaurant;