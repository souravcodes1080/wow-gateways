import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "./addLocations.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

function AddLocations() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setlocationData({ ...locationData, [name]: name === "locationRating" ? parseInt(newValue) : newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post("http://localhost:8080/location", locationData);

      toast.success("Location added successfully!", {
        onClose: () => {
          navigate("/");
        },
        autoClose: 5000,
      });
    } catch (error) {
      toast.error("Process unsuccessful!", {
        className: 'custom-toast-success',
        autoClose: 5000,
      });
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


            <button
              className="add-homestay"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding location..." : "Add location"}
            </button>
          </div>
          <div className="form-right">
            {/* Commented out unused code */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLocations;
