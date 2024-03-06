import React from 'react'
import moment from "moment"
import "./table.css"


function MonthSection({ month, noOfRooms, roomData }) {
  const daysInMonth = moment().month(month).daysInMonth();

  return (
    <>
      <p style={{ fontSize: '18px', marginTop: '30px' }}>{month}</p>
      <div className="grid-box-wrapper">
        {Array.from({ length: daysInMonth }).map((_, dayIndex) => (
          <div key={dayIndex} className="day-row">
            <p style={{ textAlign: 'center' }}>{dayIndex + 1}</p>
            {Array.from({ length: noOfRooms }).map((_, roomIndex) => {
              const currentDate = moment().month(month).date(dayIndex + 1);
              const isBooked = roomData.some(data => {
                const checkInDate = moment(data.checkIn).date();
                const checkOutDate = moment(data.checkOut).date();
                return (
                  currentDate.isSameOrAfter(checkInDate) &&
                  currentDate.isSameOrBefore(checkOutDate) &&
                  data.rooms === roomIndex + 1
                );
              });

              let className = 'grid-box';
              if (isBooked) {
                className += ' booked';
              }

              return (
                <div key={`${dayIndex}-${roomIndex}`} className={className}>
                  {`R${roomIndex + 1}`}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}


function Table({homestayName, noOfRooms, roomData}) {
  const months = moment.months()
  return (
    <>
      {months.map((month, index)=>(
        <MonthSection
        key={index}
        month={month}
        noOfRooms={noOfRooms}
        roomData={roomData} />
      ))}
     
      {roomData && roomData.map((bookingGroup, index) => (
        <div key={index}>
          {bookingGroup.map(booking => (
            <div key={booking._id} className="booking-item">
              <h2>Booking Details</h2>
              <p><strong>Customer Name:</strong> {booking.customerName}</p>
              <p><strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
              <p><strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
              <p><strong>Number of Rooms:</strong> {booking.rooms}</p>
            </div>
          ))}
        </div>
      ))}
      
    </>
  )
}

export default Table