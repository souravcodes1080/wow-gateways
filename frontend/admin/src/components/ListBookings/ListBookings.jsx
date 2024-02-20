import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./listBooking.css";
import { FaBook, FaList, FaSearch } from "react-icons/fa";
import moment from "moment"; 
import { RiCalendarEventFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';

function ListBooking() {
  const [booking, setBooking] = useState([]);
  const [originalBooking, setOriginalBooking] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooking, setFilteredBooking] = useState([]);
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
      setOriginalBooking(response.data.bookings);
    } catch (error) {
      toast.error("Error!", {
        className: 'custom-toast-success',
        autoClose: 5000,
      });
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
    setBooking(originalBooking);
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

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    const filtered = originalBooking.filter(
      (book) =>
        book.customerName.toLowerCase().includes(value) ||
        book.homestayName.toLowerCase().includes(value) ||
        book.customerEmail.toLowerCase().includes(value) ||
        book.customerPhoneNumber.toString().includes(value)
    );
    setFilteredBooking(filtered);
  };

  //==================================================

  const [itemOffset, setItemOffset] = useState(0);
const itemsPerPage = 5;

const endOffset = itemOffset + itemsPerPage;

const currentItems = booking.slice(itemOffset, endOffset);
const pageCount = Math.ceil(booking.length / itemsPerPage);

const handlePageClick = (event) => {
  const newOffset = (event.selected * itemsPerPage) % booking.length;
  setItemOffset(newOffset);
};

//====================================================

  return (
    <>
      <div className="admin-booking-list-container">
        <div className="manage-customer-header manage-homestay-header">
          <h5><FaBook/>Manage Bookings</h5>
          <div>
            <input type="text" placeholder="Search" onChange={handleSearch} />
            <button onClick={getAllBookings}> <FaList />All Booking</button>
            <button onClick={getTodaysBookings}> <RiCalendarEventFill />Today's Booking</button>
            <button onClick={getOngoingBookings}>Ongoing Bookings</button>
            <button onClick={getPaymentDueBookings}>Payment Due Bookings</button>
          </div>
        </div>

        <div className="list-booking">
          <table className="list-product-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Homestay Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>CheckIn</th>
                <th>CheckOut</th>
                <th>Rooms</th>
                <th>Adults</th>
                <th>Child (0-5)</th>
                <th>Child (6-9)</th>
                <th>Cars</th>
                <th>Total Amount</th>
                <th>Paid</th>
                <th>Guest Due</th>
                <th>B2B Price</th>
                <th>Advanced paid B2B</th>
                <th>Due B2B</th>
                <th>Booked On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(searchQuery ? filteredBooking : currentItems).map((book, index) => (
                <tr key={index}>
                  <td>{book.customerName}</td>
                  <td>{book.homestayName}</td>
                  <td>{book.customerPhoneNumber}</td>
                  <td>{book.customerEmail}</td>
                  <td>{moment(book.checkIn).format("MMMM DD, YYYY")}</td>
                  <td>{moment(book.checkOut).format("MMMM DD, YYYY")}</td>
                  <td>{book.noOfRoomsBooked}</td>
                  <td>{book.noOfAdults}</td>
                  <td>{book.noOfchilds1}</td>
                  <td>{book.noOfchilds2}</td>
                  <td>{book.cars}</td>
                  <td>{book.totalAmount}</td>
                  <td>{book.paid}</td>
                  <td>{book.due}</td>
                  <td>{book.totalHomestayPriceB2B}</td>
                  <td>{book.advPaidB2B}</td>
                  <td>{book.dueB2B}</td>
                  <td>{moment(book.bookedOn).format("MMMM DD, YYYY")}</td>
                  <td>
                    <button onClick={() => updateBooking(book._id)}>Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
        
        </div>
      </div>
    </>
  );
}

export default ListBooking;
