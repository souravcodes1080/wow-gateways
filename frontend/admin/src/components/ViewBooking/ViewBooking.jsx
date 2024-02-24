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
  return (
    <>
      <div className="admin-panel-wrapper-add-homestay">
        <div className="dashboard-main-add-homestay">
          <div style={{ marginLeft: "20px", marginRight:"20px" }}>
            <div className="booked-on">
              Booked on: {Moment(bookingData.bookedOn).format("DD - MM - yyyy")}
            </div>
            <div className="basic-details">
              <div className="name">
                <FaCircleUser />
                {bookingData.customerName}
              </div>
              <div className="phonenumber">
                {bookingData.customerPhoneNumber}
              </div>
              <div className="phonenumber">{bookingData.customerEmail}</div>
            </div>
            <br /><br />
            <div className="booking-details">
              <div className="booking-details-left">
                <div className="adults">
                  Number of Adults: {bookingData.noOfAdults}
                </div>
                <div className="child1">
                  Number of Child (under 5 years): {bookingData.noOfchilds1}
                </div>
                <div className="child2">
                  Number of Child (under 10 years): {bookingData.noOfchilds2}
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
                      <p className="underline">Tour {index+1}</p>
                      <p>Homestay Name: {tourItem.homestayName}</p>
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
