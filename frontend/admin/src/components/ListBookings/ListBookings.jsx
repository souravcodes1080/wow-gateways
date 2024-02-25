import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./listBooking.css";
import { FaBook, FaEdit, FaEye, FaList, FaSearch } from "react-icons/fa";
import moment from "moment";
import { RiCalendarEventFill } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
function ListBooking() {
  const [booking, setBooking] = useState([]);
  const [originalBooking, setOriginalBooking] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooking, setFilteredBooking] = useState([]);
  const [noResults, setNoResults] = useState(false); // State to track if no results are found
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
        className: "custom-toast-success",
        autoClose: 5000,
      });
      console.log(error);
    }
  };

  const getOngoingBookings = () => {
    const currentDate = moment();
    const ongoingBookings = originalBooking.filter((book) => {
      const checkInDate = moment(book.tour[0].checkIn); // Accessing the first tour array's checkIn date
      const checkOutDate = moment(book.tour[book.tour.length - 1].checkOut); // Accessing the last tour array's checkOut date
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
  const viewBooking = (id) => {
    navigate(`/admin/viewbooking/${id}`);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value === "") {
      // If the search query is empty, show all original bookings
      setBooking(originalBooking);
      setFilteredBooking([]);
      setNoResults(false);
      return;
    }

    const filtered = originalBooking.filter((book) =>

    
      book.customerName.toLowerCase().includes(value) ||
      book.customerID.toString().includes(value) ||
      book.customerPhoneNumber.toString().includes(value) 
    
    );

    setFilteredBooking(filtered);
    setNoResults(filtered.length === 0); // Set noResults to true if filtered array is empty
  };

  //==================================================

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 9;

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = booking
    .slice(Math.max(booking.length - endOffset, 0), booking.length - itemOffset)
    .reverse();

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
          <h5>
            <FaBook />
            Manage Bookings
          </h5>
          <div>
            <input type="text" placeholder="Search" onChange={handleSearch} />
            <button onClick={getAllBookings}>
              {" "}
              <FaList />
              All Booking
            </button>
            <button onClick={getTodaysBookings}>
              {" "}
              <RiCalendarEventFill />
              Today's Booking
            </button>
            <button onClick={getOngoingBookings}>Ongoing Bookings</button>
            <button onClick={getPaymentDueBookings}>
              Payment Due Bookings
            </button>
          </div>
        </div>

        <div className="list-booking">
          <table className="list-product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                {/* <th>Homestay Name</th> */}
                <th>Phone Number</th>
                <th>Email</th>
                <th>Adults</th>

                <th>Total Amount</th>
                <th>Paid</th>
                <th>Booked On</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            {noResults ? (
              <tbody>
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    No search results found
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {(searchQuery ? filteredBooking : currentItems).map(
                  (book, index) => (
                    <tr key={index}>
                      <td>{book.customerID}</td>
                      <td>{book.customerName}</td>
                      {/* <td>{book.homestayName}</td> */}
                      <td>{book.customerPhoneNumber}</td>
                      <td>{book.customerEmail}</td>

                      <td>{book.noOfAdults}</td>

                      <td>{book.totalHomestayPriceC}</td>
                      <td>{book.paid}</td>

                      <td>{moment(book.bookedOn).format("DD, MMMM YYYY")}</td>
                      <td>
                        <button onClick={() => viewBooking(book._id)}>
                          <FaEye /> View
                        </button>
                      </td>
                      <td>
                        <button onClick={() => updateBooking(book._id)}>
                          <FaEdit /> Update
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            )}
          </table>

          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            className="pagination"
          />
        </div>
      </div>
    </>
  );
}

export default ListBooking;
