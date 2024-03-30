// authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const {Restaurant} = require('../models/restaurantModel');
// const { ObjectID } = require('mongodb');
// Authentication middleware
const authenticateUser = (req, res, next) => {
  // const token = req.headers.authorization;
  
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

 
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).json({ message: 'Invalid token' });
    }
    try {
      if (decoded.role === 'user') {
        const user = await User.findById(decoded.userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
      } else if (decoded.role === 'restaurant_owner') {
        console.log("decode==========>"+decoded.restaurantId);

        const restaurant = await Restaurant.findById(decoded.restaurantId);
        
        if (!restaurant) {
          return res.status(404).json({ message: 'Restaurant not found' });
        }
        req.restaurant = restaurant;
      }
      console.log("haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};

// Authorization middleware for user roles
const authorizeUser = (req, res,roles,next) => {
  // console.log(roles);
  // return (req, res, next) => {
    
  //   if (!roles.includes(req.user.role)) {
  //     return res.status(403).json({ message: 'Forbidden' });
  //   }

    next();
  // };
};

// Authorization middleware for restaurant owner roles
const authorizeRestaurantOwner = (req, res, next) => {
  if (req.restaurant && req.restaurant.role === 'restaurant_owner' /*&& req.user._id.toString() === req.restaurant.owner.toString()*/) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
};

module.exports = { authenticateUser, authorizeUser, authorizeRestaurantOwner };
