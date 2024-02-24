import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./editBooking.css";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaUserCircle } from "react-icons/fa";

const EditBooking = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({});
  const [homestayList, setHomestayList] = useState([]);
  const [carList, setCarList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.put(
          `http://localhost:8080/home/${id}`
        );
        setBookingData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooking();
  }, [id]);
  useEffect(() => {
    fetchHomestayNames();
    fetchCarList()
  }, []);

  const fetchHomestayNames = async () => {
    try {
      const response = await axios.get("http://localhost:8080/homestay");
      setHomestayList(response.data);
    } catch (error) {
      console.error("Error fetching homestay names:", error);
    }
  };
  const fetchCarList = async () =>{
    try{
      const response = await axios.get("http://localhost:8080/car")
       setCarList(response.data.cars)
       console.log(response.data)
    }catch(err){
      console.log(err)
    }
  }
  const handleInputChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedBookingData = {
        ...bookingData,
        // Convert number inputs to integers
        noOfRoomsBooked: parseInt(bookingData.noOfRoomsBooked),
        noOfAdults: parseInt(bookingData.noOfAdults),
        noOfchilds1: parseInt(bookingData.noOfchilds1),
        noOfchilds2: parseInt(bookingData.noOfchilds2),
        totalAmount: parseInt(bookingData.totalAmount),
        paid: parseInt(bookingData.paid),
        // Calculate due
        due: parseInt(bookingData.totalAmount - bookingData.paid)
      };
      await axios.put(`http://localhost:8080/home/${id}`, updatedBookingData);

      toast.success("Booking edited successfully!", {
        onClose: () => {
          navigate("/admin/bookinglist");
        },
        autoClose: 3000,
      });
    } catch (error) {

      toast.error("Update unsuccessfull!", {                                                   
        className: 'custom-toast-success',
        autoClose: 3000,
      });

      console.log(error);
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };


  return (
    <div className="admin-panel-wrapper-add-homestay">
      <ToastContainer/>
      <div className="dashboard-main-add-homestay">
      <h2 style={{margin:"10px",display: "flex", alignItems: "center", gap:"10px"}}><FaUserCircle/> {bookingData.customerName}</h2>
      <p>{bookingData.homestayName}</p>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-left">
          <div className="form-wrapper">
              <label>Customer Name</label>
              <input
                required
                type="text"
                name="customerName"
                value={bookingData.customerName}
                placeholder="Customer Name"
                onChange={handleInputChange}
              />
            </div>

            <div className="form-wrapper">
              <label>Customer Phone Number</label>
              <input
                type="number"
                required
                name="customerPhoneNumber"
                value={bookingData.customerPhoneNumber}
                placeholder="Customer phonenumber"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Customer Email Address</label>
              <input
                type="email"
                name="customerEmail"
                value={bookingData.customerEmail}
                placeholder="Customer Email"
                onChange={handleInputChange}
              />
            </div>

            <div className="form-wrapper">
              <label>Number of adults</label>
              <input
                type="number"
                required
                name="noOfAdults"
                value={bookingData.noOfAdults}
                placeholder="Number of Adults"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Number of Childs(0-4 yrs.)</label>
              <input
                type="number"
                name="noOfchilds1"
                placeholder="Number of Children"
                value={bookingData.noOfchilds1}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Number of Childs(5-9 yrs.)</label>
              <input
                type="number"
                name="noOfchilds2"
                value={bookingData.noOfchilds2}
                placeholder="Number of Children"
                onChange={handleInputChange}
              />
            </div>

            
            
          </div>
          <div className="form-right">
          <div className="form-wrapper">
              <label>Total Price (Customer)</label>
              <input
                disabled
                required
                type="number"
                name="totalAmount"
                placeholder="Price"
                onChange={handleInputChange}
                value={bookingData.totalHomestayPriceC}
              />
            </div>
            <div className="form-wrapper">
              <label>Paid (to WOW)</label>
              <input
                type="number"
                name="paid"
                placeholder="Total Amount Paid"
                onChange={handleInputChange}
                value={bookingData.paid}
              />
            </div>
            <div className="form-wrapper">
              <label>Note</label>
              <textarea
                className="address-textarea"
                type="text"
                name="note"
                placeholder="Customer note"
                onChange={handleInputChange}
              />
            </div>
            {/* <div className="form-wrapper">
              <label>Homestay Total Price(B2B)</label>
              <input
                disabled
                required
                type="number"
                name="totalHomestayPriceB2B"
                placeholder="Price"
                onChange={handleInputChange}
                value={totalHomestayPrice}
              />
            </div> */}
            <div className="form-wrapper">
              <label>Guest Remaining Balance</label>
              <input
                disabled
                required
                type="number"
                name="due"
                placeholder="Price"
                onChange={handleInputChange}
                value={bookingData.totalHomestayPriceC - bookingData.paid}
              />
            </div>
            {/* <div className="form-wrapper">
              <label>B2B Homestay Due</label>
              <input
                disabled
                required
                type="number"
                name="dueB2B"
                placeholder="Price"
                onChange={handleInputChange}
                value={totalHomestayPrice - customerData.advPaidB2B}
                className={totalHomestayPrice - customerData.advPaidB2B >= 0 ? "green" : "red"}
              />
            // </div> */}


            {/* <button type="reset">
              Reset
            </button> */}


            <button
              className="add-homestay"
              type="submit"
              
            >
              Update Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBooking;
