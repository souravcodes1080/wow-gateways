import React, { useState } from "react";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";

import { MdDashboard } from "react-icons/md";
import { TiUserAdd } from "react-icons/ti";
import { MdAddHomeWork } from "react-icons/md";
import { FaCar, FaCarSide, FaLocationArrow } from "react-icons/fa";
import { RiGridFill } from "react-icons/ri";
import { FaTable } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";

function Sidebar() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("Dashboard");

  const handleClick = (value) => {
    setCurrentTab(value);
  };
  return (
    <>
      <div className="dashboard-sidebar">
        <ul>
          <li
            onClick={() => {
              handleClick("Dashboard");
              navigate("/");
            }}
            className={currentTab === "Dashboard" ? "current" : ""}
          >
            <p>
              <MdDashboard />
              Dashboard
            </p>
          </li>
          <li
            onClick={() => {
              handleClick("AddCustomer");
              navigate("/admin/addcustomer");
            }}
            className={currentTab === "AddCustomer" ? "current" : ""}
          >
            <p>
              <TiUserAdd />
              New Booking
            </p>
          </li>
          <li
            onClick={() => {
              handleClick("ManageTour");
              navigate("/admin/managetour");
            }}
            className={currentTab === "ManageTour" ? "current" : ""}
          >
            <p>
              <FaLocationArrow />
              Manage Tour
            </p>
          </li>
          <li
            onClick={() => {
              handleClick("MB")
              navigate("/admin/bookinglist");
            }}
            className={currentTab === "MB" ? "current" : ""}>

            <p>
              <FaTable />
              Manage Bookings
            </p>

          </li>
          <li
            onClick={() => {
              handleClick("MH")
              navigate("/admin/homestaylist");
            }}
            className={currentTab === "MH" ? "current" : ""}>

            <p>
              <RiGridFill />
              Manage Homestays
            </p>
          </li>

          {/* <li
            onClick={() => {
              handleClick("AddHomestay");
              navigate("/admin/addhomestay");
            }}
            className={currentTab === "AddHomestay" ? "current" : ""}
          >
            <p>
              <MdAddHomeWork />
              Add Homestay
            </p>
          </li> */}
          <li
            onClick={() => {
              handleClick("AddCar");
              navigate("/admin/addcar");
            }}
            className={currentTab === "AddCar" ? "current" : ""}
          >
            <p>
              <FaCar />
              Add Cars
            </p>
          </li>

          <li
            onClick={() => {
              handleClick("AddLocations");
              navigate("/admin/addlocations");
            }}
            className={currentTab === "AddLocations" ? "current" : ""}
          >
            <p>
              <FaLocationPin />
              Add Locations
            </p>
          </li>

          <li
            onClick={() => {
              handleClick("MC")
              navigate("/admin/carlist");
            }}
            className={currentTab === "MC" ? "current" : ""}>

            <p>
              <FaCarSide />
              Manage Cars
            </p>

          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
