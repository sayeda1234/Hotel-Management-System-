const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    default: uuidv4,
    unique: true
  },
  name: String,
  phone: String,
  checkInDate: Date,
  checkOutDate: Date
});

module.exports = mongoose.model('Booking', bookingSchema);

