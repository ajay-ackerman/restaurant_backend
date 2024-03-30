const express = require('express');
// const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const { connectDB } = require('./connection');
const reservationCleanup = require('./utils/reservationCleanup');


require('dotenv').config();

//connection
connectDB('mongodb://127.0.0.1:27017/hotel');
const app = express()
PORT = 8000

//routes 
app.use(express.json());
app.use("/users",userRoutes);
app.use("/restaurants",restaurantRoutes);
app.use("/reservations",reservationRoutes);

//middle wear
//  app.use(express.urlencoded({extended: false}));

// Start reservation cleanup job
reservationCleanup.start();


//Schema
app.listen(PORT , ()=>console.log("running on port "+PORT))
