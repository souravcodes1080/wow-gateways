import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import "./navbar.css";
import logo from "../../../public/logo/logo.png";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Navbar() {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };

  return (
    <div className="container">
      <header className="header-top">
        <div className="header-left">
          <img src={logo} alt="wow_gateways_image" />
        </div>
        <div className="header-middle">
          <ul>
            <li>
              <Link className="link active" to={"/"}>
                Home
              </Link>
            </li>
            <li>
              <Link className="link" to={"/aboutus"}>
                About Us
              </Link>
            </li>
            <li>
              <Link className="link" to={"/location"}>
                Locations
              </Link>
            </li>
            {/* <li>
            <Link className="link" to={"/service"}>Services</Link>
          </li>
          <li>
            <Link className="link" to={"/contactus"}>Contact Us</Link>
          </li> */}
          </ul>
        </div>
        <div className="header-right">
          <div className="header-instagram">
            <a
              href="https://www.instagram.com/wowgateways?igsh=MWwxZHA0NWE4d3E1Ng=="
              target="_blank"
            >
              <FaInstagram className="icon" />
            </a>
          </div>
          <div className="header-facebook">
            <a
              href="https://www.facebook.com/profile.php?id=100083183924011&sfnsn=wiwspwa&mibextid=RUbZ1f"
              target="_blank"
            >
              <FaFacebook className="icon" />
            </a>
          </div>
          <div className="header-linkedin">
            <a
              href="https://www.facebook.com/profile.php?id=100083183924011&sfnsn=wiwspwa&mibextid=RUbZ1f"
              target="_blank"
            >
              <FaLinkedin className="icon" />
            </a>
          </div>
        </div>
      </header>

      <header className="header-bottom">
        <div className="header-bottom-input-wrapper">
          <div className="destination label">
            <label>Where?</label>
            <input
              type="text"
              className="input-destination"
              placeholder="Search Destination"
            />
          </div>
          <div className="checkin label">
            <label>Check In?</label>
            <DatePicker
              placeholderText="Check In"
              selected={checkInDate}
              onChange={handleCheckInDateChange}
              dateFormat="MMMM d, yyyy"
              className="date-picker"
            />{" "}
          </div>
          <div className="checkout label">
            <label>Check Out?</label>

            <DatePicker
              placeholderText="Check Out"
              selected={checkOutDate}
              onChange={handleCheckOutDateChange}
              dateFormat="MMMM d, yyyy"
              className="date-picker"

            />
          </div>
          <div className="guest label">
            <label>Who?</label>
            <input
              type="number"
              className="input-guest"
              placeholder="How many?"
            />
          </div>
        </div>
        <button className="search-btn">
          <FaSearch />
        </button>
      </header>
    </div>
  );
}

export default Navbar;
