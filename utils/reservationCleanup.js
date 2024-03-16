// reservationCleanup.js

const cron = require('node-cron');
const Reservation = require('../models/reservationModel');

const startReservationCleanup = () => {
  // Schedule job to run once a day at midnight
  cron.schedule('0 0 * * *', async () => {
    try {
      // Calculate date one week ago
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      // Find reservations older than one week and delete them
      await Reservation.deleteMany({ date: { $lt: oneWeekAgo } });

      console.log('Old reservations deleted successfully');
    } catch (err) {
      console.error('Error deleting old reservations:', err);
    }
  });
};

module.exports = { start: startReservationCleanup };
