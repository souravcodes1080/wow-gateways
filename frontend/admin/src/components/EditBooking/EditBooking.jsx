import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./editBooking.css";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <h3>{bookingData.customerName}</h3>
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
              <label>Homestay Name</label>
              <select
                required
                name="homestayName"
                value={bookingData.homestayName}
                onChange={handleInputChange}
              >
                <option value="">Select Homestay</option>
                {homestayList.map((homestay) => (
                  <option key={homestay._id} value={homestay.homestayName}>
                    {homestay.homestayName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-wrapper">
              <label>Package</label>
              <select
                required
                type="text"
                name="tourPackage"
                placeholder="Homestay Name"
                onChange={handleInputChange}
                value={bookingData.tourPackage}
              >
                <option value="">Select packages</option>
                <option value="premium">Premium</option>
                <option value="dulux">Dulux</option>
                <option value="normal">Normal</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div className="form-wrapper">
              <label>Customer Phone Number</label>
              <input
                type="number"
                name="customerPhoneNumber"
                placeholder="Customer phonenumber"
                value={bookingData.customerPhoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Customer Email Address</label>
              <input
                type="email"
                value={bookingData.customerEmail}
                name="customerEmail"
                placeholder="Customer Email"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Check In Date</label>
              <input value={formatDate(bookingData.checkIn)} type="date" name="checkIn" onChange={handleInputChange} />
            </div>
            <div className="form-wrapper">
              <label>Check Out Date</label>
              <input value={formatDate(bookingData.checkOut)} type="date" name="checkOut" onChange={handleInputChange} />
            </div>
            <div className="form-wrapper">
              <label>Number of Rooms booked</label>
              <input
                type="number"
                name="noOfRoomsBooked"
                value={bookingData.noOfRoomsBooked}
                placeholder="Rooms Booked"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Number of adults</label>
              <input
                type="number"
                name="noOfAdults"
                value={bookingData.noOfAdults}
                placeholder="Number of Adults"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Number of Childs(0-5 yrs.)</label>
              <input
                type="number"
                name="noOfchilds1"
                value={bookingData.noOfchilds1}
                placeholder="Number of Children"
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
              <label>Cars</label>
              <select
                required
                name="cars"
                value={bookingData.cars}
                onChange={handleInputChange}
              >
                <option value="">Select Car</option>
                {carList.map((car) => (
                  <option key={car._id} value={car.carName}>
                    {car.carName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-wrapper">
              <label>Total Price</label>
              <input
                required
                type="number"
                name="totalAmount"
                value={bookingData.totalAmount}
                placeholder="Price"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Paid</label>
              <input
                type="number"
                name="paid"
                placeholder="Total Amount Paid"
                value={bookingData.paid}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Due</label>
              <input
                type="number"
                name="due"
                value={bookingData.totalAmount - bookingData.paid}
                placeholder="Total Amount Due"
                disabled
              />
            </div>
            <div className="form-wrapper">
              <label>Note</label>
              <textarea
                className="address-textarea"
                type="text"
                name="note"
                value={bookingData.note}
                placeholder="Customer note"
                onChange={handleInputChange}
              />
            </div>
            <button
              className="add-homestay"
              type="submit"
              
            >
              {/* {isSubmitting ? "Adding Customer..." : "Add Customer"} */}
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBooking;

    // <div className="admin-panel-wrapper-add-homestay">
    //   <Sidebar />
    //   <div className="dashboard-main-add-homestay">
    //     <h3>{bookingData.customerName}</h3>
    //     <p>{bookingData.homestayName}</p>
    //     <form onSubmit={handleSubmit} encType="multipart/form-data">
    //       <div className="form-left">
    //         <div className="form-wrapper">
    //           <label>Name</label>
    //           <input
    //             type="text"
    //             name="customerName"
    //             value={bookingData.customerName}
    //             placeholder="Customer Name"
    //             onChange={handleInputChange}
    //           />
    //         </div>
    //         <div className="form-wrapper">
    //           <label>Customer Phone Number</label>
    //           <input
    //             type="email"
    //             name="email"
    //             value={bookingData.email}
    //             placeholder="Homestay Email"
    //             onChange={handleInputChange}
    //           />
    //         </div>
    //         <div className="form-wrapper">
    //           <label>Price per day</label>
    //           <input
    //             type="number"
    //             name="price"
    //             value={bookingData.price}
    //             placeholder="Homestay price/day"
    //             onChange={handleInputChange}
    //           />
    //         </div>
    //         <div className="form-wrapper">
    //           <label>Homestay address</label>
    //           <textarea
    //             className="address-textarea"
    //             type="text"
    //             name="address"
    //             placeholder="Homestay Address"
    //             onChange={handleInputChange}
    //             value={bookingData.address}
    //           />
    //         </div>
    //         <div className="form-wrapper">
    //           <label>Number of Rooms available</label>
    //           <input
    //             type="number"
    //             name="noOfrooms"
    //             placeholder="Homestay Rooms"
    //             onChange={handleInputChange}
    //             value={bookingData.noOfrooms}
    //           />
    //         </div>
    //         <div className="form-wrapper">
    //           <label>Number of Cars available</label>
    //           <input
    //             type="number"
    //             name="noOfcarss"
    //             placeholder="Homestay Cars"
    //             onChange={handleInputChange}
    //             value={bookingData.noOfCars}
    //           />
    //         </div>
    //         {/* <div className="form-wrapper">
    //           <label>Features (use comma to seperate values)</label>
    //           <input
    //             type="text"
    //             name="features"
    //             placeholder="Homestay features"
    //             onChange={handleInputChange}
    //             value={bookingData.features}
    //           />
    //         </div> */}
    //         <div className="form-wrapper">
    //           <label>Location</label>
    //           <select
    //             name="location"
    //             onChange={handleInputChange}
    //             value={bookingData.location}
    //           >
    //             <option value="">Select location</option>
    //             <option value="darjeeling">Darjeeling</option>
    //             <option value="kalimpong">Kalimpong</option>
    //             <option value="sittong">Sittong</option>
    //             <option value="tinchwe">Tinchwe</option>
    //             <option value="fikka">Fikka</option>
    //             <option value="paygon">Paygon</option>
    //             <option value="lava">Lava</option>
    //             <option value="gantok">Gantok</option>
    //             <option value="lachen">Lachen</option>
    //             <option value="lachong">Lachong</option>
    //             <option value="pelling">Pelling</option>
    //             <option value="ravangla">Ravangla</option>
    //             <option value="namchi">Namchi</option>
    //           </select>
    //         </div>
    //         <div className="form-wrapper">
    //           <label>Google Map Link</label>
    //           <input
    //             type="text"
    //             value={bookingData.googleMapLink}
    //             name="googleMapLink"
    //             placeholder="Homestay Google Map"
    //             onChange={handleInputChange}
    //           />
    //         </div>
    //         <button className="add-homestay" type="submit">
    //           {/* {isSubmitting ? 'Adding Homestay...' : 'Add Homestay'} */}
    //           Update
    //         </button>
    //       </div>
    //       <div className="form-right">
    //         {/* <div className="form-wrapper-pictures">
    //           <label>Homestay images (Max 20)</label>
    //           <input required type="file" multiple  />
    //           <div className="image-previews">
    //             {imagePreviews.map((preview, index) => (
    //               <img
    //               className="preview-image"
    //                 key={index}
    //                 src={preview}
    //                 alt={`Image ${index}`}
    //                 width={"50px"}
    //               />
    //             ))}
    //           </div>
    //         </div> */}
    //         {/* <div className="form-wrapper-pictures">
    //           <label>Interior images</label>
    //           <input type="file" required multiple onChange={handleBalconyFileChange} />
    //           <div className="image-previews">
    //             {imageBalconyPreviews.map((preview, index) => (
    //               <img
    //               className="preview-image"
    //                 key={index}
    //                 src={preview}
    //                 alt={`Image ${index}`}
    //                 width={"50px"}
    //               />
    //             ))}
    //           </div>
    //         </div>
    //         <div className="form-wrapper-pictures">
    //           <label>Exterior images</label>
    //           <input required type="file" multiple onChange={handleViewFileChange} />
    //           <div className="image-previews">
    //             {imageViewPreviews.map((preview, index) => (
    //               <img
    //               className="preview-image"
    //                 key={index}
    //                 src={preview}
    //                 alt={`Image ${index}`}
    //                 width={"50px"}
    //               />
    //             ))}
    //           </div>
    //         </div>

    //         <div className="form-wrapper-pictures">
    //           <label>Room View</label>
    //           <input required type="file" multiple onChange={handleRoomFileChange} />
    //           <div className="image-previews">
    //             {imageRoomPreviews.map((preview, index) => (
    //               <img
    //               className="preview-image"
    //                 key={index}
    //                 src={preview}
    //                 alt={`Image ${index}`}
    //                 width={"50px"}
    //               />
    //             ))}
    //           </div>
    //         </div> */}

            
            
    //       </div>
    //     </form>
    //   </div>
    // </div>