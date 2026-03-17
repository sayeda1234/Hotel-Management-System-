const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const verifyToken = require("../middleware/verifyToken");

// ===============================
// ✅ Create New Booking
// ===============================
router.post('/',verifyToken, async (req, res) => {
  try {
    const { name, phone, roomName, checkInDate, checkOutDate } = req.body;

    // 🔹 Check if room is already booked for selected dates
    const existingBooking = await Booking.findOne({
      roomName,
      $or: [
        {
          checkInDate: { $lte: checkOutDate },
          checkOutDate: { $gte: checkInDate }
        }
      ]
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "Room already booked for selected dates"
      });
    }

    const newBooking = new Booking({
      name,
      phone,
      roomName,
      checkInDate,
      checkOutDate,
    });

    await newBooking.save();

    res.status(201).json({ message: 'Booking successful!' });

  } catch (error) {
    console.error("Booking error:", error.message);
    res.status(500).json({ message: 'Server error while booking.' });
  }
});


// ===============================
// ✅ Get Booked Dates for Calendar
// ===============================
router.get('/:roomName', async (req, res) => {
  try {
    const bookings = await Booking.find({
      roomName: req.params.roomName
    });

    let bookedDates = [];

    bookings.forEach(booking => {
      let start = new Date(booking.checkInDate);
      let end = new Date(booking.checkOutDate);

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        bookedDates.push(
          new Date(d).toISOString().split("T")[0]
        );
      }
    });

    res.json(bookedDates);

  } catch (error) {
    console.error("Fetch error:", error.message);
    res.status(500).json({ message: "Error fetching booked dates" });
  }
});

module.exports = router;