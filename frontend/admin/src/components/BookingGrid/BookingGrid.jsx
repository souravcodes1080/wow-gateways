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
  const [roomData, setRoomData] = useState(null);
  const [noOfRooms, setNoOfRooms] = useState(0)
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
      setRoomData(response.data);
      const selectedHomestayObj = homestaylist.find((h)=>(h.homestayName === selectedHomestay))
      setNoOfRooms(selectedHomestayObj.noOfrooms)
    } catch (error) {
      console.error("Error fetching room availability:", error);
    }
  };

  const handleHomestayNameChange = (e) => {
    setSelectedHomestay(e.target.value);
    
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
                roomData={roomData}
                noOfRooms = {noOfRooms}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BookingGrid;
