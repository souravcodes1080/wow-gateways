import React, { useEffect, useState } from "react";
import "./addCar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
function AddCar() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("adminAuthorizationToken")) {
      navigate("/admin/login");
    }
  }, []);

  const [carData, setCarData] = useState({
    carName: "",
    driverName: "",
    driverPhoneNumber: "",
    driverPhoneNumberAlt: "",
    carType: "",
    noOfSeats: "",
    drivingLocation: "",
    ac: false,
    condition: "",
    carRating: "",
  });
  //   const [images, setImages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setCarData({ ...carData, [name]: name === "noOfSeats" ? parseInt(newValue) : newValue });
  };

  //   const handleFileChange = (e) => {
  //     const files = Array.from(e.target.files);
  //     setImages(e.target.files);
  //     const previews = files.map((file) => URL.createObjectURL(file));
  //     setImagePreviews(previews);
  //   };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   const formData = new FormData();
  //   Object.keys(carData).forEach((key) => formData.append(key, carData[key]));
  //   // Array.from(images).forEach((image) => formData.append("images", image));

  //   try {
  //     await axios.post("http://localhost:8080/car", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     alert("Car added successfully!");

  //     navigate("/");
  //   } catch (error) {
  //     alert("Error adding Car. Please try again later.");
  //     console.error(error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post("http://localhost:8080/car", carData);

      alert("Car added successfully!");
      navigate("/");
    } catch (error) {
      alert("Error adding Car. Please try again later.");
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
              <label>Car Name</label>
              <input
                required
                type="text"
                name="carName"
                placeholder="Car Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Car Driver Name</label>
              <input
              required
                type="text"
                name="driverName"
                placeholder="Driver Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Driver Phone Number</label>
              <input
              required
                type="number"
                name="driverPhoneNumber"
                placeholder="Driver Phone Number"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Driver Phone Number (alt.)</label>
              <input
                type="number"
                name="driverPhoneNumberAlt"
                placeholder="Driver alt Phone Number"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Type</label>
              <input
                type="text"
                name="carType"
                placeholder="Car Type"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>No of Seats</label>
              <select
                name="noOfSeats"
                onChange={handleInputChange}
                value={carData.noOfSeats}
              >
                <option value="">Select Seats</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="">12</option>
              </select>
            </div>
            <div className="form-wrapper">
              <label>Preferred Driving Location</label>
              <input
                type="text"
                name="drivingLocation"
                placeholder="Driving Location"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Ac / Non Ac</label>
              <input
                className="checkboxes"
                type="checkbox"
                name="ac"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Car Condition</label>
              <select
                name="condition"
                onChange={handleInputChange}
                value={carData.condition}
              >
                <option value="">Select condition</option>
                <option value="Fair">Fair</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
              </select>
            </div>
            <div className="form-wrapper">
              <label>Car Rating</label>
              <select
                name="carRating"
                onChange={handleInputChange}
                value={carData.carRating}
              >
                <option value="">Select rating</option>
                <option value="1">1 Star</option>
                <option value="2">2 Star</option>
                <option value="3">3 Star</option>
                <option value="4">4 Star</option>
                <option value="5">5 Star</option>
              </select>
            </div>
            <button
              className="add-homestay"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding Car..." : "Add Car"}
            </button>
          </div>
          <div className="form-right">
            {/* <div className="form-wrapper-pictures">
              <label>Car images (Max 5)</label>
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
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCar;
