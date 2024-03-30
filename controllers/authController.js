// authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { Restaurant } = require('../models/restaurantModel');

exports.signUp = async (req, res) => {
  try {
    // Validate user input
    // Check if the email is already registered
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: 'user'
       // Assign a default role
    });

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET);

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.signIn = async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.restaurantSignUp = async (req, res) => {
  try {
    // Validate restaurant input
    // Check if the email is already registered
    const existingRestaurant = await Restaurant.findOne({ email: req.body.email });
    if (existingRestaurant) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new restaurant
    const newRestaurant = await Restaurant.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: 'restaurant_owner' // Assign a default role
    });

    // Generate JWT token
    const token = jwt.sign({ restaurantId: newRestaurant._id, role: newRestaurant.role }, process.env.JWT_SECRET);

    res.status(201).json({ restaurant: newRestaurant, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.restaurantSignIn = async (req, res) => {
  try {
    console.log(req.body.email);
    // Find the restaurant by email
    const restaurant = await Restaurant.findOne({ email: req.body.email });
    console.log("resta"+ restaurant);
    if (!restaurant) {
      return res.status(401).json({ message: 'Invalid email ' });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(req.body.password, restaurant.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ restaurantId: restaurant._id, role: restaurant.role }, process.env.JWT_SECRET);

    res.json({ restaurant, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};