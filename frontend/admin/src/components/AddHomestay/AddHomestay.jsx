import React, { useEffect, useState } from "react";
import "./addHomestay.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    b2b: "",
    address: "",
    noOfrooms: "",
    noOfcars: "",
    googleMapLink: "",
    features: [],
    location: "",
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

      //alert("Homestay added successfully!");
      toast.success("Homestay added successfully!", {
        onClose: () => {
          navigate("/");
        },
        autoClose: 5000,
      });
    } catch (error) {
      //alert("Error adding homestay. Please try again later.");

      toast.error("Process Unsuccessfull!", {
        className: 'custom-toast-success',
        autoClose: 5000,
      });

      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-panel-wrapper-add-homestay">
      <ToastContainer />
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
              <label>Customer Price per day</label>
              <input
                type="number"
                name="price"
                placeholder="Customer price/day"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Homestay B2B Price</label>
              <input
                type="number"
                name="b2b"
                placeholder="Homestay B2B Price"
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
              <label>Features (use comma to seperate values)</label>
              <input
                type="text"
                name="features"
                placeholder="Homestay features"
                onChange={handleInputChange}
              />
            </div>
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
              <input  type="file" multiple onChange={handleViewFileChange} />
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
              <input  type="file" multiple onChange={handleRoomFileChange} />
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
