import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookRoom.css';
import axios from 'axios'; 

const BookRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const room = location.state?.room;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  if (!room) {
    return <div className="error">Room details not found.</div>;
  }



const handleBooking = async (e) => {
  e.preventDefault();

  const bookingData = {
    name,
    phone,
    roomName: room.name,
    checkInDate,
    checkOutDate,
  };

  try {
    const response = await axios.post('http://localhost:5000/api/bookings', bookingData);
    console.log("Booking response:", response.data);
    alert(`Thank you ${name}, your booking is confirmed!`);
    navigate('/rooms');
  } catch (error) {
    console.error("Booking failed:", error.response?.data || error.message);
    alert("An error occurred. Please try again.");
  }
};



  return (
    <div className="booking-page">
      <div className="booking-container">
        <h2>Booking for {room.name}</h2>
        <div className="room-details">
          <img src={room.image} alt={room.name} />
          <div className="room-info">
            <p>{room.description}</p>
            <p><strong>Price:</strong> ${room.price} / night</p>
            <p><strong>Amenities:</strong> {room.amenities?.join(', ') || 'N/A'}</p>
          </div>
        </div>

        <form onSubmit={handleBooking} className="booking-form">
          <label>Your Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />

          <label>Phone Number:</label>
          <input 
            type="tel" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            pattern="[0-9]{10}" 
            placeholder="Enter 10-digit number"
            required 
          />

          <label>Check-in Date:</label>
          <input 
            type="date" 
            value={checkInDate} 
            onChange={(e) => setCheckInDate(e.target.value)} 
            required 
          />

          <label>Check-out Date:</label>
          <input 
            type="date" 
            value={checkOutDate} 
            onChange={(e) => setCheckOutDate(e.target.value)} 
            required 
          />

          <button type="submit">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
};

export default BookRoom;
