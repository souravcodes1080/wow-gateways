import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./editTours.css";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditTours = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({});
  const [homestayList, setHomestayList] = useState([]);
  const [carList, setCarList] = useState([]);
  const [locationList, setLocationList] = useState([]);
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
    fetchLocationList();
  }, []);

  // useEffect(() => {
  //   filterLocationList();
  // }, [bookingData.to]);

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
    } catch (err) {
      console.log(err);
    }
  };
  const fetchLocationList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/location");
      setLocationList(response.data.locations);
    } catch (err) {
      console.log(err);
    }
  };

  const handleHomestayChange = (e) => {
    const selectedHomestayName = e.target.value;
    const selectedHomestay = homestayList.find(
      (homestay) => homestay.homestayName === selectedHomestayName
    );
    if (selectedHomestay) {
      const homestayLocation = selectedHomestay.location; // Assuming 'location' property holds the homestay location
      const filteredLocations = locationList.filter(
        (location) => location.locationHolder === homestayLocation
      );
      setLocationList(filteredLocations);
    }
  };

  // const filterLocationList = () => {
  //   const selectedHomestay = homestayList.find(homestay => homestay.homestayName === bookingData.to);
  //   if (selectedHomestay) {
  //     const homestayLocation = selectedHomestay.location; // Assuming 'location' property holds the homestay location
  //     const filteredLocations = locationList.filter(location => location.locationName === homestayLocation);
  //     setLocationList(filteredLocations);
  //   }
  // };

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
              <select name="from" onChange={handleInputChange}>
                <option value="">Select Starting point</option>
                <option value="">New Jalpaiguri</option>
                <option value="">Bagdogra</option>
              </select>
            </div>

            <div className="form-wrapper">
              <label>To</label>
              <select required name="to" onChange={handleHomestayChange}>
                <option value="">Select Homestay</option>
                {homestayList.map((homestay) => (
                  <option key={homestay._id} value={homestay.homestayName}>
                    {homestay.homestayName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-wrapper">
              <label>Available Location list</label>
              {locationList.map((location) => (
                <div key={location._id}>
                  <input
                    type="checkbox"
                    id={location._id}
                    name="location"
                    value={location.locationName}
                    onChange={handleInputChange}
                  />
                  <label htmlFor={location._id}>{location.locationName}</label>
                </div>
              ))}
            </div>

            <div className="form-wrapper">
              <label>Check In Date</label>
              <input
                type="text"
                value={moment(bookingData.checkIn).format("DD-MM-yyyy")}
              />
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
