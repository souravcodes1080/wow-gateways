import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./listBooking.css";
import Sidebar from "../Sidebar/Sidebar";
import { FaRupeeSign } from "react-icons/fa";
import moment from "moment"; // Import moment library

function ListBooking() {
  const [booking, setBooking] = useState([]);
  const [originalBooking, setOriginalBooking] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State variable for search query
  const [filteredBooking, setFilteredBooking] = useState([]); // State variable for filtered bookings
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("adminAuthorizationToken")) {
      navigate("/admin/login");
    }
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      const response = await axios.get("http://localhost:8080/home/booking");
      setBooking(response.data.bookings);
      setOriginalBooking(response.data.bookings); // Set original bookings
      console.log(response.data.bookings);
    } catch (error) {
      console.log(error);
    }
  };

  const getOngoingBookings = () => {
    const currentDate = moment();
    const ongoingBookings = originalBooking.filter((book) => {
      const checkInDate = moment(book.checkIn);
      const checkOutDate = moment(book.checkOut);
      return currentDate.isBetween(checkInDate, checkOutDate);
    });
    setBooking(ongoingBookings);
  };

  const getAllBookings = () => {
    setBooking(originalBooking); // Set original bookings
  };

  const getTodaysBookings = () => {
    const today = moment().startOf("day");
    const todaysBookings = originalBooking.filter((book) =>
      moment(book.bookedOn).isSame(today, "day")
    );
    setBooking(todaysBookings);
  };

  const getPaymentDueBookings = () => {
    const paymentDueBookings = originalBooking.filter((book) => book.due > 0);
    setBooking(paymentDueBookings);
  };

  const updateBooking = (id) => {
    navigate(`/admin/editbooking/${id}`);
  };

  // Function to handle search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase(); // Convert search query to lowercase
    setSearchQuery(value); // Update search query state
    // Filter bookings based on search query
    const filtered = originalBooking.filter(
      (book) =>
        book.customerName.toLowerCase().includes(value) || // Search by customer name
        book.homestayName.toLowerCase().includes(value) || // Search by homestay name
        
        book.customerEmail.toLowerCase().includes(value) // Search by email
    );
    setFilteredBooking(filtered); // Set filtered bookings state
  };


  return (
    <div className="admin-panel-wrapper">
      <Sidebar />
      <div className="dashboard-main-add-homestay">
        <div className="list-product">
          <h1>All Booking list</h1>
          <br />
          
          <div className="action-buttons">
          {/* <input
            type="text"
            placeholder="Search "
            value={searchQuery}
            onChange={handleSearch}
          /> */}
            <button onClick={getOngoingBookings}>Ongoing Bookings</button>
            <button onClick={getAllBookings}>All Bookings</button>
            <button onClick={getTodaysBookings}>Today's Bookings</button>
            <button onClick={getPaymentDueBookings}>Guest Payment Due Bookings</button>
            <button onClick={getPaymentDueBookings}>Homestay Payment Due Bookings</button>
          </div>
          <br />
          <table className="list-product-table">
            <thead>
              <tr>
                <th className="column-picture">Name</th>
                <th className="column-name">Homestay Name</th>
                <th className="column-phone">Phone Number</th>
                <th className="column-email">Email</th>
                <th className="column-email">CheckIn</th>
                <th className="column-email">CheckOut</th>
                <th className="column-email">Rooms</th>
                <th className="column-price">Adults</th>
                <th className="column-price">Child (0-5)</th>
                <th className="column-price">Child (6-9)</th>
                <th className="column-price">Cars</th>
                <th className="column-price">Total Amount</th>
                <th className="column-price">Paid</th>
                <th className="column-price">Due</th>
                <th className="column-price">Booked On</th>
              </tr>
            </thead>
            <tbody>
              {booking.map((book, index) => (
                <tr key={index}>
                  <td className="column-name">{book.customerName}</td>
                  <td className="column-name">{book.homestayName}</td>
                  <td className="column-phone">{book.customerPhoneNumber}</td>
                  <td className="column-email">{book.customerEmail}</td>
                  <td className="column-address">{moment(book.checkIn).format("MMMM DD, YYYY")}</td>
                  <td className="column-price">{moment(book.checkOut).format("MMMM DD, YYYY")}</td>
                  <td className="column-price">{book.noOfRoomsBooked}</td>
                  <td className="column-price">{book.noOfAdults}</td>
                  <td className="column-price">{book.noOfchilds1}</td>
                  <td className="column-price">{book.noOfchilds2}</td>
                  <td className="column-price">{book.cars}</td>
                  <td className="column-price">{book.totalAmount}</td>
                  <td className="column-price">{book.paid}</td>
                  <td className="column-price">{book.due}</td>
                  <td className="column-price">{moment(book.bookedOn).format("MMMM DD, YYYY")}</td>
                  <td>
                    <button
                      onClick={() => {
                        updateBooking(book._id);
                      }}
                      className="list-product-update-item"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        updateBooking(book._id);
                      }}
                      className="list-product-delete-item"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListBooking;
