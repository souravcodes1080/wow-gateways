import React, { useEffect, useState } from "react";
import "./bookingGrid.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaBook, FaTable } from "react-icons/fa";
import Table from "../Table/Table";

function BookingGrid() {
  const navigate = useNavigate();
  const [homestaylist, setHomestayList] = useState([]);
  const [selectedHomestay, setSelectedHomestay] = useState("");
  const [noOfRooms, setNoOfRooms] = useState(0);
  const [roomAvailabilityData, setRoomAvailabilityData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("adminAuthorizationToken")) {
      navigate("/admin/login");
    }
    fetchHomestayList();
  }, []);
  useEffect(() => {
    fetchRoomAvailability();
  }, [selectedHomestay]);
  const fetchHomestayList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/homestay/homestayName"
      );
      setHomestayList(response.data);
    } catch (error) {
      console.error("Error fetching homestay list:", error);
    }
  };

  const fetchRoomAvailability = async () => {
    try {
      console.log("Fetching room availability for:", selectedHomestay);
      const response = await axios.get(
        `http://localhost:8080/homestay/homestay?homestayName=${selectedHomestay}`
      );
      setRoomAvailabilityData(response.data.rooms);
      console.log(response.data.rooms);
      const selectedHomestayObj = homestaylist.find(
        (h) => h.homestayName === selectedHomestay
      );
      setNoOfRooms(selectedHomestayObj ? selectedHomestayObj.noOfrooms : null);
    } catch (error) {
      console.error("Error fetching room availability:", error);
    }
  };

  const handleHomestayNameChange = (e) => {
    setSelectedHomestay(e.target.value);
    const selectedHomestayObj = homestaylist.find(
      (h) => h.homestayName === e.target.value
    );
    setNoOfRooms(selectedHomestayObj ? selectedHomestayObj.noOfrooms : null);
  };

  const handleRooms = () => {};
  return (
    <>
      <div className="">
        <div className="admin-booking-list-container">
          <div className="manage-customer-header manage-homestay-header">
            <h5>
              <FaTable />
              Booking Grid 2024
            </h5>

            <div className="select-homestay-list">
              <select
                value={selectedHomestay}
                name=""
                id=""
                onChange={handleHomestayNameChange}
              >
                <option value="">Select Homestay</option>
                {homestaylist.map((item, index) => (
                  <option key={index} value={item.homestayName}>
                    {item.homestayName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {selectedHomestay === "" ? (
            <p style={{ textAlign: "center", marginTop: "40px" }}>
              No homestay selected
            </p>
          ) : (
            <div className="view-table">
              <Table
                homestayName={selectedHomestay}
                rooms={noOfRooms}
                roomAvailabilityData={roomAvailabilityData}
                loading={loading}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BookingGrid;
