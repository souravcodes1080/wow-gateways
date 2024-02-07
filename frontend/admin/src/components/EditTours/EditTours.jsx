import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./editTours.css";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditTours = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({});
  const [homestayList, setHomestayList] = useState([]);
  const [carList, setCarList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.put(`http://localhost:8080/home/${id}`);
        setBookingData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooking();
  }, [id]);
  useEffect(() => {
    fetchHomestayNames();
    fetchCarList();
  }, []);

  const fetchHomestayNames = async () => {
    try {
      const response = await axios.get("http://localhost:8080/homestay");
      setHomestayList(response.data);
    } catch (error) {
      console.error("Error fetching homestay names:", error);
    }
  };
  const fetchCarList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/car");
      setCarList(response.data.cars);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleInputChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedBookingData = {
        ...bookingData,
        // Convert number inputs to integers
        // noOfRoomsBooked: parseInt(bookingData.noOfRoomsBooked),
        // noOfAdults: parseInt(bookingData.noOfAdults),
        // noOfchilds1: parseInt(bookingData.noOfchilds1),
        // noOfchilds2: parseInt(bookingData.noOfchilds2),
        // totalAmount: parseInt(bookingData.totalAmount),
        // paid: parseInt(bookingData.paid),
        // // Calculate due
        // due: parseInt(bookingData.totalAmount - bookingData.paid),
       
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
        className: "custom-toast-success",
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
      <ToastContainer />
      <div className="dashboard-main-add-homestay">
        <h3>{bookingData.customerName}</h3>
        <p>{bookingData.homestayName}</p>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-left">
            <h1>Phase 1</h1>
            <div className="form-wrapper">
              <label>From</label>
              <select  name="from" onChange={handleInputChange}>
                <option value="">Select Starting point</option>
                <option value="">New Jalpaiguri</option>
                <option value="">Bagdogra</option>
              </select>
            </div>
            <div className="form-wrapper">
              <label>To</label>
              <select required name="homestayName" onChange={handleInputChange}>
                <option value="">Select Homestay</option>
                {homestayList.map((homestay) => (
                  <option key={homestay._id} value={homestay.homestayName}>
                    {homestay.homestayName}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="form-wrapper">
              <label>Homestay Name</label>
              <select required name="homestayName" onChange={handleInputChange}>
                <option value="">Select Homestay</option>
                {homestayList.map((homestay) => (
                  <option key={homestay._id} value={homestay.homestayName}>
                    {homestay.homestayName}
                  </option>
                ))}
              </select>
            </div> */}

            <div className="form-wrapper">
              <label>No. of Car</label>
              <input
                type="number"
                name="noOfCar"
                placeholder="Number of cars"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Car Type</label>
              <select required name="cars" onChange={handleInputChange}>
                <option value="">Select Car</option>
                {carList.map((car) => (
                  <option key={car._id} value={car.carName}>
                    {car.carName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-wrapper">
              <label>Driver Phone Number</label>
              <input
                type="number"
                name="number"
                placeholder="Driver Phone Number"
                onChange={handleInputChange}
              />
            </div>



            <h1>Phase 2</h1>
            <div className="form-wrapper">
              <label>From</label>
              <input
                required
                type="text"
                name="from"
                placeholder="From Location"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>To</label>
              <input type="text" name="to" placeholder="To Location" />
            </div>
            <div className="form-wrapper">
              <label>Homestay Name</label>
              <select required name="homestayName" onChange={handleInputChange}>
                <option value="">Select Homestay</option>
                {homestayList.map((homestay) => (
                  <option key={homestay._id} value={homestay.homestayName}>
                    {homestay.homestayName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-wrapper">
              <label>No. of Car</label>
              <input
                type="number"
                name="noOfCar"
                placeholder="Number of cars"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Car Type</label>
              <select required name="cars" onChange={handleInputChange}>
                <option value="">Select Car</option>
                {carList.map((car) => (
                  <option key={car._id} value={car.carName}>
                    {car.carName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-wrapper">
              <label>Driver Phone Number</label>
              <input
                type="number"
                name="number"
                placeholder="Driver Phone Number"
                onChange={handleInputChange}
              />
            </div>


            <h1>Phase 3</h1>
            <div className="form-wrapper">
              <label>From</label>
              <input
                required
                type="text"
                name="from"
                placeholder="From Location"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>To</label>
              <input type="text" name="to" placeholder="To Location" />
            </div>
            <div className="form-wrapper">
              <label>Homestay Name</label>
              <select required name="homestayName" onChange={handleInputChange}>
                <option value="">Select Homestay</option>
                {homestayList.map((homestay) => (
                  <option key={homestay._id} value={homestay.homestayName}>
                    {homestay.homestayName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-wrapper">
              <label>No. of Car</label>
              <input
                type="number"
                name="noOfCar"
                placeholder="Number of cars"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Car Type</label>
              <select required name="cars" onChange={handleInputChange}>
                <option value="">Select Car</option>
                {carList.map((car) => (
                  <option key={car._id} value={car.carName}>
                    {car.carName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-wrapper">
              <label>Driver Phone Number</label>
              <input
                type="number"
                name="number"
                placeholder="Driver Phone Number"
                onChange={handleInputChange}
              />
            </div>

            <h1>Phase 4</h1>
            <div className="form-wrapper">
              <label>From</label>
              <input
                required
                type="text"
                name="from"
                placeholder="From Location"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>To</label>
              <input type="text" name="to" placeholder="To Location" />
            </div>
            <div className="form-wrapper">
              <label>Homestay Name</label>
              <select required name="homestayName" onChange={handleInputChange}>
                <option value="">Select Homestay</option>
                {homestayList.map((homestay) => (
                  <option key={homestay._id} value={homestay.homestayName}>
                    {homestay.homestayName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-wrapper">
              <label>No. of Car</label>
              <input
                type="number"
                name="noOfCar"
                placeholder="Number of cars"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Car Type</label>
              <select required name="cars" onChange={handleInputChange}>
                <option value="">Select Car</option>
                {carList.map((car) => (
                  <option key={car._id} value={car.carName}>
                    {car.carName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-wrapper">
              <label>Driver Phone Number</label>
              <input
                type="number"
                name="number"
                placeholder="Driver Phone Number"
                onChange={handleInputChange}
              />
            </div>


            <h1>Phase 5</h1>
            <div className="form-wrapper">
              <label>From</label>
              <input
                required
                type="text"
                name="from"
                placeholder="From Location"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>To</label>
              <input type="text" name="to" placeholder="To Location" />
            </div>
            <div className="form-wrapper">
              <label>Homestay Name</label>
              <select required name="homestayName" onChange={handleInputChange}>
                <option value="">Select Homestay</option>
                {homestayList.map((homestay) => (
                  <option key={homestay._id} value={homestay.homestayName}>
                    {homestay.homestayName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-wrapper">
              <label>No. of Car</label>
              <input
                type="number"
                name="noOfCar"
                placeholder="Number of cars"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Car Type</label>
              <select required name="cars" onChange={handleInputChange}>
                <option value="">Select Car</option>
                {carList.map((car) => (
                  <option key={car._id} value={car.carName}>
                    {car.carName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-wrapper">
              <label>Driver Phone Number</label>
              <input
                type="number"
                name="number"
                placeholder="Driver Phone Number"
                onChange={handleInputChange}
              />
            </div>

            <button className="add-homestay" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTours;

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
