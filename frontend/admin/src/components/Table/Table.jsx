import React, { useState, useEffect } from 'react';
import moment from 'moment';
import "./table.css";

function MonthSection({ month, rooms, roomAvailabilityData }) {
  const daysInMonth = moment().month(month).daysInMonth();

  return (
    <>   
      <p style={{fontSize: "18px", marginTop:"30px"}}>{month}</p>
      <div className="grid-box-wrapper">
        {Array.from({ length: daysInMonth }).map((_, dayIndex) => (
          <div key={dayIndex} className="day-row">
            <p style={{textAlign: "center"}}>{dayIndex + 1}</p>
            {Array.from({ length: rooms }).map((_, roomIndex) => {
              const isBooked = roomAvailabilityData.some(booking => {
                const checkIn = moment(booking.checkIn).format('YYYY-MM-DD');
                const checkOut = moment(booking.checkOut).format('YYYY-MM-DD');
                const currentDate = moment().month(month).date(dayIndex + 1).format('YYYY-MM-DD');
                return currentDate >= checkIn && currentDate <= checkOut && booking.rooms.includes(roomIndex + 1);
              });
              return (
                <div
                  key={roomIndex}
                  className={`grid-box ${isBooked ? 'booked' : ''}`}
                >
                  R{roomIndex + 1}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

function Table({ homestayName, rooms }) {
  const months = moment.months();
  const [roomAvailabilityData, setRoomAvailabilityData] = useState([]);

  useEffect(() => {
    // Fetch room availability data from the backend when component mounts
    fetchRoomAvailabilityData();
  }, []);

  const fetchRoomAvailabilityData = async () => {
    try {
      // Fetch room availability data from the backend API
      const response = await fetch(`/api/roomAvailability?homestayName=${homestayName}`);
      const data = await response.json();
      console.log(data)
      setRoomAvailabilityData(data);
    } catch (error) {
      console.error('Error fetching room availability data:', error);
    }
  };

  return (
    <>
      {months.map((month, index) => (
        <MonthSection
          key={index}
          month={month}
          rooms={rooms}
          roomAvailabilityData={roomAvailabilityData}
        />
      ))}
    </>
  );
}

export default Table;
