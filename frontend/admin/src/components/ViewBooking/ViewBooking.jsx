import axios from "axios";
import Moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./viewBooking.css";
import { FaCircleUser } from "react-icons/fa6";
import moment from "moment";
function ViewBooking() {
  const [bookingData, setBookingData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      const response = await axios.get(
        `http://localhost:8080/home/booking/${id}`
      );
      console.log(response.data);
      setBookingData(response.data);
    };
    fetchBookingDetails();
  }, [id]);

  const calculateTotalTourDays = () => {
    if (bookingData.length === 0 || !bookingData.tour || bookingData.tour.length === 0) {
      return 0; // No tours or booking data, return 0 days
    }
  
    // Get the check-in date of the first tour
    const firstCheckIn = new Date(bookingData.tour[0].checkIn);
  
    // Get the check-out date of the last tour
    const lastCheckOut = new Date(bookingData.tour[bookingData.tour.length - 1].checkOut);
  
    // Calculate the time difference in milliseconds
    const timeDifference = lastCheckOut - firstCheckIn;
  
    // Convert milliseconds to days
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  
    return daysDifference;
  };
  
  
  // Now you can use this function to calculate total tour days
  const totalTourDays = calculateTotalTourDays();
  
  return (
    <>
      <div className="admin-panel-wrapper-add-homestay">
        <div className="dashboard-main-add-homestay">
          <div style={{ margin: "20px" }}>
            
            
            <div className="booking-details">
              <div className="booking-details-left">
              <div className="basic-details">
              <div className="name">
                <FaCircleUser />
                {bookingData.customerName}
              </div>
              <div className="phonenumber">
                {bookingData.customerPhoneNumber}
              </div>
              <div className="phonenumber">{bookingData.customerEmail}</div>
              <div className="phonenumber">
            {Moment(bookingData.bookedOn).format("DD - MM - yyyy")}
            </div>
            </div>
            <br /><br />
                <div className="adults">
                  Number of Adults: {bookingData.noOfAdults}
                </div>
                <div className="child1">
                  Number of Child (under 5 years): {bookingData.noOfchilds1}
                </div>
                <div className="child2">
                  Number of Child (under 10 years): {bookingData.noOfchilds2}
                </div>
                <div className="">
                  Total Tour Days: {totalTourDays}
                </div>
                <br />
                <div className="total amount">
                  Total Amount: ₹ {bookingData.totalAmount}
                </div>
                <div className="paid">
                  Total Amount Paid: ₹ {bookingData.paid}
                </div>
                <div className="due">Amount Due: ₹ {bookingData.due}</div>
                <br />
                <div className="b2b">
                  Total B2B Price: ₹ {bookingData.totalHomestayPriceB2B}
                </div>
                <div className="b2b">
                  Advanced B2B Price paid: ₹ {bookingData.advPaidB2B}
                </div>
                <div className="b2b">Due B2B Price: ₹ {bookingData.dueB2B}</div>
                <br />
                <div className="note">Note: {bookingData.note} lorem100</div>
              </div>
              <div className="booking-details-right">
                {bookingData?.tour &&
                  bookingData.tour.map((tourItem, index) => (
                    <div key={tourItem._id}>
                      <p style={{textAlign:"center"}} className="underline">Tour {index+1}</p>
                      <p style={{textAlign:"center", fontWeight:"600", paddingBottom:"10px"}}>{tourItem.homestayName}</p>
                      <p>
                        Check-In Date:{" "}
                        {new Date(tourItem.checkIn).toLocaleDateString()}
                      </p>
                      <p>
                        Check-Out Date:{" "}
                        {new Date(tourItem.checkOut).toLocaleDateString()}
                      </p>
                      <p>Price: ₹ {tourItem.price}</p>
                      <p>Car: {tourItem.car}</p>
                      <p>Car Cost: ₹ {tourItem.carCost}</p>
                      <p>Rooms: {tourItem.rooms}</p>
                      <br />
                    </div>
                  ))}
                
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewBooking;
