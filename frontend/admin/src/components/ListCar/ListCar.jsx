import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./listCar.css";
import Sidebar from "../Sidebar/Sidebar";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBook, FaCar, FaPlusCircle } from "react-icons/fa";


function ListCar() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [originalCars, setOriginalCars] = useState([]); // State variable for storing original list of cars
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState(""); // State variable for sorting
  const [searchTerm, setSearchTerm] = useState(""); // State variable for search

  useEffect(() => {
    if (!localStorage.getItem("adminAuthorizationToken")) {
      navigate("/admin/login");
    }

    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:8080/car");
        setCars(response.data.cars);
        setOriginalCars(response.data.cars); // Store the original list of cars

      } catch (error) {

        toast.error("Fetch Unsuccessfull!", {
          className: 'custom-toast-success',
          autoClose: 5000,
        });

        console.log(error);
      }
    };

    fetchCars();
  }, []);

  // Function to handle sorting based on rating
  const sortCarsByRating = () => {
    const sortedCars = [...cars].sort((a, b) => a.carRating - b.carRating);
    setCars(sortedCars);
  };

  // Function to handle sorting based on condition
  const sortCarsByCondition = () => {
    const sortedCars = [...cars].sort((a, b) =>
      a.condition.localeCompare(b.condition)
    );
    setCars(sortedCars);
  };
  const addCar = ()=>{
    navigate("/admin/addcar")
  }

  // Function to handle search filtering
  const handleSearch = () => {
    const filteredCars = originalCars.filter(
      (car) =>
        car.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.drivingLocation.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCars(filteredCars);
  };

  return (
    <div className="admin-panel-wrapper admin-panel-wrapper-add-homestay">
      <div className="dashboard-main-add-car">
        <div className="manage-customer-header manage-homestay-header">
          <h5><FaCar />Manage Cars</h5>
          <div>
            {/* <input type="text" placeholder="Search" onChange={handleSearch} /> */}
            <button onClick={sortCarsByRating}>Sort by Rating</button>
            {/* Button to sort by condition */}
            <button onClick={sortCarsByCondition}>Sort by Condition</button>
            <button onClick={addCar}><FaPlusCircle/> Add New Car</button>
          </div>
        </div>
        <div className="list-product">
          {/* <h1>All Cars list</h1>
          <div className="search-sort-buttons">
           
            <button onClick={handleSearch}>Search</button>
          </div>
          <br /> */}
          <table className="list-product-table">
            <thead>
              <tr>
                <th className="column-picture">Car Name</th>
                <th className="column-name">Driver Name</th>
                <th className="column-address">Phone Number</th>
                <th className="column-phone">Phone Number (alt.)</th>
                <th className="column-email">Location</th>
                <th className="column-price">Ac</th>
                <th className="column-price">Seats</th>
                <th className="column-price">Condition</th>
                <th className="column-price">Action</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car, index) => (
                <tr key={index}>
                  <td className="column-name">{car.carName}</td>
                  <td className="column-address">{car.driverName}</td>
                  <td className="column-phone">{car.driverPhoneNumber}</td>
                  <td className="column-phone">{car.driverPhoneNumberAlt}</td>
                  <td className="column-price">{car.drivingLocation}</td>
                  <td className="column-price">{car.ac ? "Yes" : "No"}</td>
                  <td className="column-email">{car.noOfSeats}</td>
                  <td className="column-price">{car.condition}</td>
                  <td className="column-price">
                    <button onClick={()=>{
                      navigate(`admin/updatecar/${car._id}`)
                    }}>Update</button>
                  </td>
                  {/* <td>
                    <button
                      onClick={() => {
                        navigate(`/admin/editcar/${car._id}`);
                      }}
                      className="list-product-update-item"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        navigate(`/admin/editcar/${car._id}`);
                      }}
                      className="list-product-delete-item"
                    >
                      Delete
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListCar;
