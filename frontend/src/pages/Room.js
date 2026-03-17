
import React from 'react';
import './Room.css';
import { Link } from 'react-router-dom';

const roomData = [
  {
    _id: 1,
    name: "Deluxe Room",
    description: "Spacious room with king-size bed, WiFi, and city view.",
    price: 120,
    image: "https://www.grandlordhotel.com/medias/room/big/78/deluxe02.jpg",
    amenities: ["WiFi", "City View", "Room Service"]
  },
  {
    _id: 2,
    name: 'Executive Room',
    description: 'Perfect for business travelers. Includes workspace and lounge access.',
    price: 150,
    image: "https://th.bing.com/th/id/OIP.6XePwJFqZbnw4uChkRtZdwHaE8?rs=1&pid=ImgDetMain",
    amenities: ["Workspace", "Lounge Access"]
  },
  {
    _id: 3,
    name: 'Standard Room',
    description: 'Comfortable room with all essentials at an affordable rate.',
    price: 90,
    image: "https://th.bing.com/th/id/OIP.AZdU-zaTIlGj5Niss-PHYwHaDg?rs=1&pid=ImgDetMain",
    amenities: ["Essentials", "Budget Friendly"]
  },
];

function Rooms() {
  return (
    <div className="rooms-container">
      <h1>Our Rooms</h1>
      {roomData.map((room) => (
        <div className="room-card" key={room._id}>
          <img src={room.image} alt={room.name} className="room-image" />
          <h2>{room.name}</h2>
          <p>{room.description}</p>
          <p><strong>Price:</strong> ${room.price} / night</p>
          <p><strong>Amenities:</strong> {room.amenities?.join(', ')}</p>
          <Link to="/book-room" state={{ room }}>
            <button className="book-btn">Book Now</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Rooms;
