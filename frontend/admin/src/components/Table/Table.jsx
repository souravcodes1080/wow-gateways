import React from 'react'
import moment from "moment"
import "./table.css"


function MonthSection ({ month, noOfRooms, roomData }) {
  const daysInMonth = moment().month(month).daysInMonth();
  console.log(roomData);

  return (
    <>
      <p style={{ fontSize: '18px', marginTop: '30px' }}>{month}</p>
      <div className="grid-box-wrapper">
        {Array.from({ length: daysInMonth }).map((_, dayIndex) => (
          <div key={dayIndex} className="day-row">
            <p style={{ textAlign: 'center' }}>{dayIndex + 1}</p>
            {Array.from({ length: noOfRooms }).map((_, roomIndex) => {
              const booking = roomData.find(data => {
                const checkInDate = moment(data.checkIn).date();
                const checkOutDate = moment(data.checkOut).date();
                return checkInDate <= dayIndex + 1 && checkOutDate >= dayIndex + 1 && data.rooms === roomIndex + 1;
              });

              const className = booking ? 'grid-box booked' : 'grid-box'; // Set className based on booking

              return <div key={roomIndex} className={className}>R{roomIndex + 1}</div>;
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
     
      
      
    </>
  )
}

export default Table