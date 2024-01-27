import React, { useState } from "react";
import "./homestay.css";
import room1 from "../../../public/pictures/room1.jpg";
import { FaDotCircle, FaRestroom, FaStar } from "react-icons/fa";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import {
  MdCurrencyRupee,
  MdEmail,
  MdLocationPin,
  MdReviews,
  MdRoomPreferences,
} from "react-icons/md";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Homestay() {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [showRoom1, setShowRoom1] = useState(false);
  const [showRoom2, setShowRoom2] = useState(false);
  const [showRoom3, setShowRoom3] = useState(false);

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };

  return (
    <>
      <div className="container">
        <br />
        <br />
        <div className="homestay-gallery">
          <div className="homestay-gallery-main">
            <img src={room1} alt="" />
          </div>
          <div className="homestay-gallery-second">
            <img src={room1} alt="" />
            <img src={room1} alt="" />
          </div>
          <div className="homestay-gallery-third">
            <img src={room1} alt="" />
            <img src={room1} alt="" />
            <img src={room1} alt="" />
          </div>
        </div>
        <br />
        <br />
        <div className="homestay-flex-wrapper">
          <div className="homestay-details">
            <div className="homestay-name">
              <h2>Panchpokhri Homestay</h2>
            </div>
            <div className="homestay-rooms">
              <p>Dedicated Bathroom . Unique View</p>
            </div>
            <div className="homestay-description">
              <p>
                Our Homestay provides a unique ambience of mysticism and
                adventure that will provide you an experience of a lifetime.
                Rediscover those forgotten rhythms of long days and easy nights
                at Panch Pokhari Homestay in sittong, imbued with contemporary
                accents, a tapestryo of cultures and a touch of tradition.
              </p>
            </div>
            <br />
            <div className="homestay-review">
              <p>
                {" "}
                <FaStar /> 4.5{" "}
              </p>
            </div>
            <div className="homestay-review">
              <p>
                {" "}
                <MdCurrencyRupee /> 1000/person/day{" "}
              </p>
            </div>
            <br />
            <h4>
              <MdLocationPin /> Location
            </h4>
            <p className="homestay-location">
              Tham, Upper, near pachpokhari, Sittong, West Bengal 734008
            </p>
            <br />
            <h4>
              {" "}
              <MdRoomPreferences /> Rooms
            </h4>
            <ul>
              <li onClick={() => setShowRoom1(!showRoom1)}>
                <p>
                  Balcony Rooms
                  {showRoom1 ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
                </p>
                <br />
                {showRoom1 && <img src={room1} alt="" width={"200px"} />}
              </li>
              <li onClick={() => setShowRoom2(!showRoom2)}>
                <p>
                  Kanchenjungha View
                  {showRoom2 ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
                </p>
                <br />
                {showRoom2 && (
                  <div className="homestay-room-li">
                    <img src={room1} alt="" width={"200px"} />
                    <img src={room1} alt="" width={"200px"} />
                  </div>
                )}
              </li>
              <li onClick={() => setShowRoom3(!showRoom3)}>
                <p>
                  Dormitories
                  {showRoom3 ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
                </p>

                <br />
                {showRoom3 && (
                  <div className="homestay-room-li">
                    <img src={room1} alt="" width={"200px"} />
                    <img src={room1} alt="" width={"200px"} />
                    <img src={room1} alt="" width={"200px"} />
                    <img src={room1} alt="" width={"200px"} />
                  </div>
                )}
              </li>
            </ul>
            <br />
            <h4>
              <MdEmail /> Contact us
            </h4>
            <p className="homestay-location">
              Panchpokhrihomestay@gmail.com +91 65656 78920
            </p>
            <br />

           
          </div>

          <div className="homestay-booking">
            <ul>
            <li><label>Check In</label></li>
              <li>
                
                <DatePicker
                  placeholderText="Check In"
                  selected={checkInDate}
                  onChange={handleCheckInDateChange}
                  dateFormat="MMMM d, yyyy"
                  className="date-picker"
                />
              </li>
              <li><label>Check Out</label></li>
              <li>
                
                <DatePicker
                  placeholderText="Check Out"
                  selected={checkOutDate}
                  onChange={handleCheckOutDateChange}
                  dateFormat="MMMM d, yyyy"
                  className="date-picker"
                />
              </li>
              <li> <label>Guest</label></li>
              
              <li className="guest">
                <input type="number" name="" id="" placeholder="Adult" />
               
                <input type="number" name="" id="" placeholder="Child" />
              </li>
              <li><label>Phone number</label></li>
              <li>
               
               <input type="number" placeholder="90000-00000" />
              </li>
              <li>
                <button>Book Now</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="homestay-review">
        <button><a target="_blank" href="https://www.google.com/search?hl=en-IN&gl=in&q=Panch+pokhari+Homestay+Sittong,+Tham,+Upper,+near+pachpokhari,+Sittong,+West+Bengal+734008&ludocid=14407024695230560213&lsig=AB86z5UdLq-YDCHn5wp90vg-vf0F#lrd=0x39e43b94781577f1:0xc7f008a0ed7f77d5,3"> Review Us <MdReviews/></a></button>
        </div>
        <div className="google-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.5662900065677!2d88.37949667519159!3d26.917256359895788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e43b94781577f1%3A0xc7f008a0ed7f77d5!2sPanch%20pokhari%20Homestay%20Sittong!5e0!3m2!1sen!2sin!4v1706336658634!5m2!1sen!2sin"
            allowfullscreen="true"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default Homestay;
