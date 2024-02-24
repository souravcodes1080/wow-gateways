import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./editHomestay.css";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHome } from "react-icons/fa";


const EditHomestay = () => {
  const navigate = useNavigate();
  const [homestayData, setHomestayData] = useState({});
  const [images, setImages] = useState([])
  const [balconyImage, setBalconyImage] = useState([])
  const [viewImage, setViewImage] = useState([])
  const [roomImage, setRoomImage] = useState([])
  const { id } = useParams();

  useEffect(() => {
    const fetchHomestay = async () => {
      try {
        const response = await axios.put(
          `http://localhost:8080/homestay/${id}`
        );
        setHomestayData(response.data);
        setImages(response.data.images)
        setBalconyImage(response.data.balconyImage)
        setRoomImage(response.data.roomImage)
        setViewImage(response.data.viewImage)
      } catch (error) {
        console.log(error);
      }
    };

    fetchHomestay();
    
  }, [id]);

  const handleInputChange = (e) => {
    setHomestayData({ ...homestayData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/homestay/${id}`, homestayData);

      toast.success("Homestay updated successfully!", {
        onClose: () => {
          navigate("/");
        },
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Homestay update Unsuccessful!", {
        onClose: () => {
        },
        autoClose: 3000,
      });

      console.log(error);
    }
  };

  return (
    <div className="admin-panel-wrapper-add-homestay">
      <ToastContainer />
      <div className="dashboard-main-add-homestay">
        <h3 style={{margin:"10px", display:"flex", alignItems:"center", gap:"10px"}}><FaHome/> {homestayData.homestayName}</h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-left">
            <div className="form-wrapper">
              <label>Homestay Name</label>
              <input
                required
                type="text"
                name="homestayName"
                value={homestayData.homestayName}
                placeholder="Homestay Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Homestay Phone Number</label>
              <input
                type="number"
                name="phoneNumber"
                value={homestayData.phoneNumber}
                placeholder="Homestay phonenumber"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Homestay Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Homestay Email"
                value={homestayData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Customer Price per day</label>
              <input
                type="number"
                name="price"
                placeholder="Customer price/day"
                value={homestayData.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Homestay B2B Price</label>
              <input
                type="number"
                name="b2b"
                placeholder="Homestay B2B Price"
                value={homestayData.b2b}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Homestay address</label>
              <textarea
                className="address-textarea"
                type="text"
                name="address"
                value={homestayData.address}
                placeholder="Homestay Address"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Number of Rooms available</label>
              <input
                type="number"
                name="noOfrooms"
                value={homestayData.noOfrooms}
                placeholder="Homestay Rooms"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Number of Cars available</label>
              <input
                type="number"
                name="noOfcarss"
                placeholder="Homestay Cars"
                value={homestayData.noOfCars}
                onChange={handleInputChange}
              />
            </div>
            {/* <div className="form-wrapper">
              <label>Features (use comma to seperate values)</label>
              <input
                type="text"
                name="features"
                placeholder="Homestay features"
                onChange={handleInputChange}
                value={homestayData.features}
              />
            </div> */}
            <div className="form-wrapper">
              <label>Location</label>
              <select
                name="location"
                onChange={handleInputChange}
                value={homestayData.location}
              >
                <option value="">Select location</option>
                <option value="darjeeling">Darjeeling</option>
                <option value="kalimpong">Kalimpong</option>
                <option value="sittong">Sittong</option>
                <option value="tinchwe">Tinchwe</option>
                <option value="fikka">Fikka</option>
                <option value="paygon">Paygon</option>
                <option value="lava">Lava</option>
                <option value="gantok">Gantok</option>
                <option value="lachen">Lachen</option>
                <option value="lachong">Lachong</option>
                <option value="pelling">Pelling</option>
                <option value="ravangla">Ravangla</option>
                <option value="namchi">Namchi</option>
              </select>
            </div>
            <div className="form-wrapper">
              <label>Google Map Link</label>
              <input
                type="text"
                name="googleMapLink"
                placeholder="Homestay Google Map"
                value={homestayData.googleMapLink}
                onChange={handleInputChange}
              />
            </div><div className="form-right"><button className="add-homestay" type="submit">
              {/* {isSubmitting ? 'Adding Homestay...' : 'Add Homestay'} */}
              Update
            </button>
          </div>
         



          </div> <div className="form-right">
            <div className="form-wrapper-pictures">

            <label>Homestay images</label>
              <div className="image-previews">
                {images.map((preview, index) => (
                  <img
                    className="preview-image"
                    key={index}
                    src={preview}
                    alt={`Image ${index}`}
                    width={"50px"}
                  />
                ))}
              </div>
            </div>
            <div className="form-wrapper-pictures">
              <label>Interior images</label>
             
              <div className="image-previews">
                {balconyImage.map((preview, index) => (
                  <img
                    className="preview-image"
                    key={index}
                    src={preview}
                    alt={`Image ${index}`}
                    width={"50px"}
                  />
                ))}
              </div>
            </div>
            <div className="form-wrapper-pictures">
              <label>Exterior images</label>
              
              <div className="image-previews">
                {viewImage.map((preview, index) => (
                  <img
                    className="preview-image"
                    key={index}
                    src={preview}
                    alt={`Image ${index}`}
                    width={"50px"}
                  />
                ))}
              </div>
            </div>

            <div className="form-wrapper-pictures">
              <label>Room View</label>
             
              <div className="image-previews">
                {roomImage.map((preview, index) => (
                  <img
                    className="preview-image"
                    key={index}
                    src={preview}
                    alt={`Image ${index}`}
                    width={"50px"}
                  />
                ))}
              </div>
            </div>

            
          </div>
         
        </form>
      </div>
    </div>
  );
};

export default EditHomestay;
