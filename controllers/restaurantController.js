// restaurantController.js
const {Restaurant,Floor} = require('../models/restaurantModel');
// const Floor = require('../models/restaurantModel');


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

exports.createFloor = async (req, res) => {
  try {
    const { floorNumber, tables } = req.body;
    const floor = new Floor({ floorNumber, tables });
    await floor.save();
    res.status(201).json(floor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Function to get all floors
exports.getAllFloors = async (req, res) => {
  try {
    const floors = await Floor.find();
    res.json(floors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTable = async (req, res) => {
  const { floorId, tableId } = req.params;
  const { numberOfSeats, isReserved } = req.body;

  try {
    const floor = await Floor.findById(floorId);

    if (!floor) {
      return res.status(404).json({ message: 'Floor not found' });
    }

    // const table = floor.tables.id(tableId);
    const table = floor.tables.findById(tableId);

    if (!table) {
      return res.status(404).json({ message: 'Table not found in the floor' });
    }

    if (numberOfSeats !== undefined) {
      table.numberOfSeats = numberOfSeats;
    }
    if (isReserved !== undefined) {
      table.isReserved = isReserved;
    }

    await floor.save();

    res.json(floor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.updateTableReservation = async (req, res) => {
  const { restaurantId, floorId, tableId } = req.params;
  const { isReserved } = req.body;

  try {
    // Find the floor by restaurantId and floorId
    const floor = await Floor.findOne({ _id: floorId, restaurant: restaurantId });

    if (!floor) {
      return res.status(404).json({ message: 'Floor not found' });
    }

    // Find the table by tableId
    const table = floor.tables.id(tableId);

    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    // Update the reservation status
    table.isReserved = isReserved;

    // Save the updated floor
    await floor.save();

    res.json(floor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};








// Function to rank restaurants based on average rating
exports.rankRestaurants = async (req, res) => {
  try {
    // Find all restaurants and sort them by average rating in descending order
    const restaurants = await Restaurant.find().sort({ averageRating: -1 });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Function to rate a restaurant
exports.rateRestaurant = async (req, res) => {
  const { restaurantId, userId, rating } = req.body;

  try {
    // Find the restaurant by ID
    const restaurant = await Restaurant.findById(restaurantId);

    // Check if the restaurant exists
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Check if the rating is within the allowed range (e.g., 1 to 5 stars)
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Invalid rating value' });
    }

    // Add the new rating to the restaurant's ratings array
    restaurant.ratings.push({ user: userId, rating });

    // Recalculate the average rating
    const totalRatings = restaurant.ratings.length;
    const totalRatingSum = restaurant.ratings.reduce((acc, curr) => acc + curr.rating, 0);
    restaurant.averageRating = totalRatingSum / totalRatings;

    // Save the updated restaurant data
    await restaurant.save();

    res.status(201).json(restaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};