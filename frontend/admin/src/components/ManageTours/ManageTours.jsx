import React from 'react'
import "./manageTours.css"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { FaBook, FaList } from 'react-icons/fa';
import { RiCalendarEventFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";
import { FaMapLocationDot } from "react-icons/fa6";


export const ManageTours = () => {
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
                book.customerEmail.toLowerCase().includes(value)
        );
        setFilteredBooking(filtered);
    };




    return (
        <>
            <div className="admin-booking-list-container">
                <div className="manage-customer-header manage-homestay-header">
                    <h5><FaMapLocationDot />Manage Customer Tours</h5>
                    <div>
                        <input type="text" placeholder="Search" onChange={handleSearch} />
                        <button onClick={getAllBookings}> <FaList />All Booking</button>
                        <button onClick={getTodaysBookings}> <RiCalendarEventFill />Today's Booking</button>
                    </div>
                </div>

                <div className="list-booking">
                    <table className="list-product-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Homestay Name</th>
                                <th>Phone Number</th>
                                <th>CheckIn</th>
                                <th>CheckOut</th>
                                <th>Total Amount</th>
                                <th>Booked On</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(searchQuery ? filteredBooking : booking).map((book, index) => (
                                <tr key={index}>
                                    <td>{book.customerName}</td>
                                    <td>{book.homestayName}</td>
                                    <td>{book.customerPhoneNumber}</td>
                                    <td>{moment(book.checkIn).format("MMMM DD, YYYY")}</td>
                                    <td>{moment(book.checkOut).format("MMMM DD, YYYY")}</td>
                                    <td>{book.totalAmount}</td>
                                    <td>{moment(book.bookedOn).format("MMMM DD, YYYY")}</td>
                                    <td>
                                        <button onClick={() => updateBooking(book._id)}>Update</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
