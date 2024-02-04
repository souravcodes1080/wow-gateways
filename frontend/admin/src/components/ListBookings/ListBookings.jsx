import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./listBooking.css";
import Sidebar from "../Sidebar/Sidebar";
import { FaBook, FaHome, FaList, FaPlus, FaRupeeSign, FaSearch, FaTable, FaTimesCircle } from "react-icons/fa";
import moment from "moment"; // Import moment library
import { RiCalendarEventFill } from "react-icons/ri";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

  // Function to fetch bookings from the server
  const fetchBooking = async () => {
    try {
      const response = await axios.get("http://localhost:8080/home/booking");
      setBooking(response.data.bookings);
      setOriginalBooking(response.data.bookings); // Set original bookings

      toast.success("Data fetched successfully!", {
        onClose: () => {
        },
        autoClose: 5000,
      });
    } catch (error) {

      toast.error("Error!", {
        className: 'custom-toast-success',
        autoClose: 5000,
      });

      console.log(error);
    }
  };

  // Function to filter bookings based on ongoing status
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
  // Function to filter bookings based on today's date
  const getTodaysBookings = () => {
    const today = moment().startOf("day");
    const todaysBookings = originalBooking.filter((book) =>
      moment(book.bookedOn).isSame(today, "day")
    );
    setBooking(todaysBookings);
  };

  // Function to filter bookings based on payment due
  const getPaymentDueBookings = () => {
    const paymentDueBookings = originalBooking.filter((book) => book.due > 0);
    setBooking(paymentDueBookings);
  };

  // Function to update booking
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

  // Render component
  return (
    <div className="admin-panel-wrapper admin-panel-wrapper-add-homestay">
      <div className="dashboard-main-add-homestay">
        <div className="list-product">
          <div className="manage-homestay-header manage-customer-header">
            <h5> <FaBook /> Manage Bookings</h5>
            <div>
              <input type="text" placeholder="Search" onChange={handleSearch} />
              {/* Search input */}
              {/* <button><FaSearch/></button> Search button */}
              <button onClick={getAllBookings}> <FaList />All Booking</button>
              <button onClick={getTodaysBookings}> <RiCalendarEventFill />Today's Booking</button>
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={getOngoingBookings}>Ongoing Bookings</button>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through filtered or original bookings based on search query */}
              {(searchQuery ? filteredBooking : booking).map((book, index) => (
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
