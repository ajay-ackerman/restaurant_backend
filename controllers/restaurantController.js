// restaurantController.js
const Restaurant = require('../models/restaurantModel');

exports.createRestaurant = async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.json(restaurant);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findByIdAndUpdate(id, req.body, { new: true });
    res.json(restaurant);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    await Restaurant.findByIdAndDelete(id);
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.addMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    restaurant.menu.push(req.body);
    await restaurant.save();
    res.json(restaurant);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    const { restaurantId, menuItemId } = req.params;
    const restaurant = await Restaurant.findById(restaurantId);
    restaurant.menu.id(menuItemId).remove();
    await restaurant.save();
    res.json(restaurant);
  } catch (err) {
    res.status(400).send(err);
  }
};
