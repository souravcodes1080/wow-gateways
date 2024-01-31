import React, { useEffect, useState } from "react";
import "./addCustomer.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
function AddCustomer() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageBalconyPreviews, setBalconyImagePreviews] = useState([]);
  const [imageViewPreviews, setViewImagePreviews] = useState([]);
  const [imageRoomPreviews, setRoomImagePreviews] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("adminAuthorizationToken")) {
      navigate("/admin/login");
    }
  }, []);

  const [homestayData, setHomestayData] = useState({
    customerName: "",
    customerPhoneNumber: "",
    customerEmail: "",
    checkIn:"",
    checkOut:"",
    noOfAdults: "",
    noOfchilds1: "",  //0-5
    noOfchilds2: "",   //5-9
    homestayName: "",
    noOfRoomsBooked: "",
    totalAmount: "",
    paid: "",
    due: "",
    note: "",
    cars: "",
    tourPackage: ""
  });
  const [images, setImages] = useState([]);
  const [balconyImage, setBalconyImage] = useState([]);
  const [viewImage, setViewImage] = useState([]);
  const [roomImage, setRoomImage] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // For the 'features' input, split the value by commas and trim whitespace
    // to create an array of features
    if (name === "features") {
      const featuresArray = value.split(",").map(feature => feature.trim());
      setHomestayData({ ...homestayData, [name]: featuresArray });
    } else {
      setHomestayData({ ...homestayData, [name]: value });
    }
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    Object.keys(homestayData).forEach((key) =>
      formData.append(key, homestayData[key])
    );
    Array.from(images).forEach((image) => formData.append("images", image));
    Array.from(balconyImage).forEach((image) =>
      formData.append("balconyImage", image)
    );
    Array.from(viewImage).forEach((image) =>
      formData.append("viewImage", image)
    );
    Array.from(roomImage).forEach((image) =>
      formData.append("roomImage", image)
    );

    try {
      await axios.post("http://localhost:8080/homestay/addhomestay", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Homestay added successfully!");

      navigate("/");
    } catch (error) {
      alert("Error adding homestay. Please try again later.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-panel-wrapper-add-homestay">
      <Sidebar />
      <div className="dashboard-main-add-homestay">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-left">
            <div className="form-wrapper">
              <label>Customer Name</label>
              <input
              required
                type="text"
                name="customerName"
                placeholder="Customer Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Homestay Name</label>
              <input
              required
                type="text"
                name="hofme"
                placeholder="Homestay Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Package</label>
              <select
              required
                type="text"
                name="tourPackage"
                value={homestayData.tourPackage}
                placeholder="Homestay Name"
                onChange={handleInputChange}
              >
                <option value="">Select packages</option>
                <option value="1">Package 1</option>
                <option value="2">Package 2</option>
                <option value="3">Package 3</option>
              </select>
            </div>
            <div className="form-wrapper">
              <label>Total Price</label>
              <input
              required
                type="number"
                name="totalAmount"
                placeholder="Price"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Customer Phone Number</label>
              <input
                type="number"
                name="customerpPhoneNumber"
                placeholder="Customer phonenumber"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Customer Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Customer Email"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Check In Date</label>
              <input
                type="date"
                name="checkInDate"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Check Out Date</label>
              <input
                type="date"
                name="checkOutDate"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Number of adults</label>
              <input
                type="number"
                name="noOfAdults"
                placeholder="Number of Adults"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Number of Childs(0-5 yrs.)</label>
              <input
                type="number"
                name="noOfChild1"
                placeholder="Number of Children"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Number of Childs(5-9 yrs.)</label>
              <input
                type="number"
                name="noOfChild2"
                placeholder="Number of Children"
                onChange={handleInputChange}
              />
            </div>
            
           
           
          </div>
          <div className="form-right"> <div className="form-wrapper">
              <label>Number of Rooms booked</label>
              <input
                type="number"
                name="noOfRoomsBooked"
                placeholder="Rooms Booked"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Cars</label>
              <input
                type="text"
                name="cars"
                placeholder="Cars"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Paid</label>
              <input
                type="number"
                name="paid"
                placeholder="Total Amount Paid"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Due</label>
              <input
                type="number"
                name="due"
                placeholder="Total Amount Due"
                onChange={handleInputChange}
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
           
            

        

          <button className="add-homestay" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding Customer...' : 'Add Customer'}
            </button>
          </div>
        </form>  
      </div>
    </div>
  );
}

export default AddCustomer;
