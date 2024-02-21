import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "./addLocations.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

function AddLocations() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("adminAuthorizationToken")) {
      navigate("/admin/login");
    }
  }, []);

  const [locationData, setlocationData] = useState({
    locationName: "",
    locationAddress: "",
    locationRating: "",
    locationHolder: "",
  });

  const [images, setImages] = useState([]);
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setlocationData({ ...locationData, [name]: name === "locationRating" ? parseInt(newValue) : newValue });
  };
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    Object.keys(locationData).forEach((key) =>
      formData.append(key, locationData[key])
    );
    Array.from(images).forEach((image) => formData.append("viewpointImages", image));
    try {
      await axios.post("http://localhost:8080/location", formData);

      toast.success("Location added successfully!", {
        onClose: () => {
          navigate("/");
        },
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Process unsuccessful!", {
        className: 'custom-toast-success',
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-panel-wrapper-add-homestay">
      <ToastContainer />
      <div className="dashboard-main-add-homestay">
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="form-add-location">
          <div className="form-left">
            <div className="form-wrapper">
              <label>Location Name</label>
              <input
                required
                type="text"
                name="locationName"
                placeholder="Location Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Location Address</label>
              <input
                required
                type="text"
                name="locationAddress"
                placeholder="Location Address"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Select Rating</label>
              <select
                name="locationRating"
                onChange={handleInputChange}
                value={locationData.locationRating}
              >
                <option value="">Select Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div className="form-wrapper">
              <label>Select Location</label>
              <select
                name="locationHolder"
                onChange={handleInputChange}
                value={locationData.locationHolder}
              >
                <option value="">Select Location</option>
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

            
          </div>
              <div className="form-right">
            <div className="form-wrapper-pictures">
              <label>Viewpoint images (Max 20)</label>
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

            <button
              className={isSubmitting ? "fade add-homestay" : "add-homestay"}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding location..." : "Add location"}
            </button>
            </div>
                
        </form>
      </div>
    </div>
  );
}

export default AddLocations;
