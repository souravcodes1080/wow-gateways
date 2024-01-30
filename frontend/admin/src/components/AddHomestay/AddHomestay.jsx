import React, { useEffect, useState } from "react";
import "./addHomestay.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
function AddHomestay() {
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
    const files = Array.from(e.target.files);
    setImages(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };
  const handleBalconyFileChange = (e) => {
    const files = Array.from(e.target.files);
    setBalconyImage(e.target.files);
    const previewsBalcony = files.map((file) => URL.createObjectURL(file));
    setBalconyImagePreviews(previewsBalcony);
  };
  const handleViewFileChange = (e) => {
    const files = Array.from(e.target.files);
    setViewImage(e.target.files);
    const previewsView = files.map((file) => URL.createObjectURL(file));
    setViewImagePreviews(previewsView);
  };
  const handleRoomFileChange = (e) => {
    const files = Array.from(e.target.files);
    setRoomImage(e.target.files);
    const previewsRoom = files.map((file) => URL.createObjectURL(file));
    setRoomImagePreviews(previewsRoom);
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
              <label>Homestay Name</label>
              <input
              required
                type="text"
                name="homestayName"
                placeholder="Homestay Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Homestay Phone Number</label>
              <input
                type="number"
                name="phoneNumber"
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
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Price per day</label>
              <input
                type="number"
                name="price"
                placeholder="Homestay price/day"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Homestay address</label>
              <textarea
                className="address-textarea"
                type="text"
                name="address"
                placeholder="Homestay Address"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Number of Rooms available</label>
              <input
                type="number"
                name="noOfrooms"
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
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Google Map Link</label>
              <input
                type="text"
                name="googleMapLink"
                placeholder="Homestay Google Map"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-right">
            <div className="form-wrapper-pictures">
              <label>Homestay images (Max 20)</label>
              <input required type="file" multiple onChange={handleFileChange} />
              <div className="image-previews">
                {imagePreviews.map((preview, index) => (
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
              <input type="file" required multiple onChange={handleBalconyFileChange} />
              <div className="image-previews">
                {imageBalconyPreviews.map((preview, index) => (
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
              <input required type="file" multiple onChange={handleViewFileChange} />
              <div className="image-previews">
                {imageViewPreviews.map((preview, index) => (
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
              <input required type="file" multiple onChange={handleRoomFileChange} />
              <div className="image-previews">
                {imageRoomPreviews.map((preview, index) => (
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

          <button className="add-homestay" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding Homestay...' : 'Add Homestay'}
            </button>
          </div>
        </form>  
      </div>
    </div>
  );
}

export default AddHomestay;