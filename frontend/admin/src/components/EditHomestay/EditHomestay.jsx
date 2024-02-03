import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./editHomestay.css";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";

const EditHomestay = () => {
  const navigate = useNavigate();
  const [homestayData, setHomestayData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchHomestay = async () => {
      try {
        const response = await axios.put(
          `http://localhost:8080/homestay/${id}`
        );
        setHomestayData(response.data);
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
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-panel-wrapper-add-homestay">
      <div className="dashboard-main-add-homestay">
        <h3>{homestayData.homestayName}</h3>
        <p>{homestayData.location}</p>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-left">
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
                value={homestayData.email}
                placeholder="Homestay Email"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Price per day</label>
              <input
                type="number"
                name="price"
                value={homestayData.price}
                placeholder="Homestay price/day"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>B2B Price per day</label>
              <input
                type="number"
                name="b2b"
                value={homestayData.b2b}
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
                value={homestayData.address}
              />
            </div>
            <div className="form-wrapper">
              <label>Number of Rooms available</label>
              <input
                type="number"
                name="noOfrooms"
                placeholder="Homestay Rooms"
                onChange={handleInputChange}
                value={homestayData.noOfrooms}
              />
            </div>
            <div className="form-wrapper">
              <label>Number of Cars available</label>
              <input
                type="number"
                name="noOfcarss"
                placeholder="Homestay Cars"
                onChange={handleInputChange}
                value={homestayData.noOfCars}
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
                value={homestayData.googleMapLink}
                name="googleMapLink"
                placeholder="Homestay Google Map"
                onChange={handleInputChange}
              />
            </div>
            <button className="add-homestay" type="submit">
              {/* {isSubmitting ? 'Adding Homestay...' : 'Add Homestay'} */}
              Update
            </button>
          </div>
          <div className="form-right">
            {/* <div className="form-wrapper-pictures">
              <label>Homestay images (Max 20)</label>
              <input required type="file" multiple  />
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
            {/* <div className="form-wrapper-pictures">
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
            </div> */}

            
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHomestay;
