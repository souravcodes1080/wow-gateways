import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

function Table({ homestayName, rooms }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/booking/getBookingsByHomestay?homestayName=${homestayName}`);
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, [homestayName]);

  const getDates = (bookings) => {
    const dates = [];
    bookings.forEach((booking) => {
      const date = moment(booking.checkIn).format('DD-MM-YYYY');
      if (!dates.includes(date)) {
        dates.push(date);
      }
      const lastDate = moment(booking.checkOut).format('DD-MM-YYYY');
      for (let d = moment(date).add(1, 'days'); d.isSameOrBefore(lastDate); d.add(1, 'days')) {
        if (!dates.includes(d.format('DD-MM-YYYY'))) {
          dates.push(d.format('DD-MM-YYYY'));
        }
      }
    });
    return dates;
  };

  const dates = getDates(bookings);

  return (
    <table className="table" style={{ width: '50%' }}>
      <thead>
        <tr>
          <th></th>
          {dates.map((date, index) => (
            <th key={index}>{date}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(rooms)].map((_, roomNumber) => (
          <tr key={roomNumber}>
            <td>{roomNumber + 1}</td>
            {dates.map((_, dateIndex) => {
              const bookedRooms = bookings.filter(
                (booking) =>
                  (moment(booking.checkIn).isSame(dates[dateIndex], 'day') ||
                    moment(booking.checkOut).isSame(dates[dateIndex], 'day') ||
                    (moment(booking.checkIn).isBefore(dates[dateIndex]) &&
                      moment(booking.checkOut).isAfter(dates[dateIndex]))) &&
                  booking.roomNumber === roomNumber + 1
              );
              return (
                <td key={dateIndex} style={{ backgroundColor: bookedRooms.length > 0 ? 'red' : 'white' }}></td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
