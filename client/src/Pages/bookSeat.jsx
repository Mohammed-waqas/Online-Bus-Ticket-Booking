import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
function FrontPage() {
  const [seatNumbers, setSeatNumbers] = useState('');
  const [message, setMessage] = useState('');
  const [busInfo, setBusInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
 const { state } = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Function to fetch bus seat information when component mounts
    const fetchBusSeatInfo = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3003/busseats/${state.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setBusInfo(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching bus seat information:', error);
        setIsLoading(false);
      }
    };

    fetchBusSeatInfo();
  }, []); // Empty dependency array to ensure useEffect runs only once

  const handleSeatReservation = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3003/seatnbr',
        { seatNumbers: seatNumbers.split(',').map(Number) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
      setMessage(error.response.data.message);
    } else {
      setMessage('Unable to reserve seats');
      console.error("Error:", error);
    }
    }
  };

  return (
    <div>
      <h1>Seat Reservation</h1>
      <div>
        <label htmlFor="seatNumbers">Enter seat numbers (comma separated):</label>
        <input
          type="text"
          id="seatNumbers"
          value={seatNumbers}
          onChange={(e) => setSeatNumbers(e.target.value)}
        />
      </div>
      <button onClick={handleSeatReservation}>Reserve Seats</button>
      {message && <p>{message}</p>}
      
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        busInfo && (
          <div>
            <h2>Bus Information</h2>
            <p>Company Name: {busInfo.bus.companyName}</p>
            <p>Model: {busInfo.bus.model}</p>
            <p>Capacity: {busInfo.bus.capacity}</p>
            <p>Registration Number: {busInfo.bus.registrationNumber}</p>
            <p>Total Number of Seats: {busInfo.numbersOfSeats}</p>
            <p>Available Seats: {busInfo.availableSeats}</p>
            <p>Available Seat Numbers: {busInfo.availableSeatNumber.join(', ')}</p>
          </div>
        )
      )}
    </div>
  );
}

export default FrontPage;
