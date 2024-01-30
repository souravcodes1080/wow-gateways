import React, { useEffect, useState } from "react";
import "./addHomestay.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function AddHomestay() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false)
    useEffect(() => {
      if (!localStorage.getItem("adminAuthorizationToken")) {
        navigate("/admin/login");
      }
    }, []);
  
    const [homestayData, setHomestayData] = useState({
      homestayName: "",
      phoneNumber: "",
      email: "",
      price: "",
      address: "",
      noOfrooms: "",
      noOfcars: "",
      googleMapLink: "",
    });
    const [images, setImages] = useState([]);
    const [balconyImage, setBalconyImage] = useState([]);
    const [viewImage, setViewImage] = useState([]);
    const [roomImage, setRoomImage] = useState([]);
  
    const handleInputChange = (e) => {
      setHomestayData({ ...homestayData, [e.target.name]: e.target.value });
    };
  
    const handleFileChange = (e) => {
      setImages(e.target.files);
    };
    const handleBalconyFileChange = (e) => {
      setBalconyImage(e.target.files);
    };
    const handleViewFileChange = (e) => {
      setViewImage(e.target.files);
    };
    const handleRoomFileChange = (e) => {
      setRoomImage(e.target.files);
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
        await axios.post(
          "http://localhost:8080/homestay/addhomestay",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        
        alert("Homestay added successfully!");
       
        navigate("/");
      } catch (error) {
        
        alert("Error adding homestay. Please try again later.");
        console.error(error);
      }finally {
        setIsSubmitting(false); 
      }
    };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        name="homestayName"
        placeholder="Homestay Name"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="phoneNumber"
        placeholder="Homestay phonenumber"
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Homestay Email"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Homestay price/day"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Homestay Address"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="noOfrooms"
        placeholder="Homestay Rooms"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="noOfcarss"
        placeholder="Homestay Cars"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="googleMapLink"
        placeholder="Homestay Google Map"
        onChange={handleInputChange}
      />
     <br />
      <label>Homestay images</label>
      <input type="file" multiple onChange={handleFileChange} /><br />
      <label>Homestay Balcony images</label>
      <input type="file" multiple onChange={handleBalconyFileChange} /><br />
      <label>Homestay Room View images</label>
      <input type="file" multiple onChange={handleViewFileChange} /><br />
      <label>Homestay Bedroom images</label>
      <input type="file" multiple onChange={handleRoomFileChange} />
      <button type="submit" disabled={isSubmitting}>Add Homestay</button>
    </form>
  );
}

export default AddHomestay;
