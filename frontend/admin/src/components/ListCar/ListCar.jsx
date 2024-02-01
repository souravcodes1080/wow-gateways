import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./listCar.css";
import Sidebar from "../Sidebar/Sidebar";

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
    <div className="admin-panel-wrapper">
      <Sidebar />
      <div className="dashboard-main-add-car">
        <div className="list-product">
          <h1>All Cars list</h1>
          <div className="search-sort-buttons">
            {/* Button to sort by rating */}
            <button onClick={sortCarsByRating}>Sort by Rating</button>
            {/* Button to sort by condition */}
            <button onClick={sortCarsByCondition}>Sort by Condition</button>
            {/* Search input field */}
            <input
              type="text"
              placeholder="Search by Car Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Button to trigger search */}
            <button onClick={handleSearch}>Search</button>
          </div>
          <br />
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
                  <td>
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
                  </td>
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