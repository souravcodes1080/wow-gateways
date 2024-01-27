import React from 'react'
import "./location.css"

import room2 from "../../../public/pictures/room2.jpg";

function Location() {
  return (
    <div className="container locations-container">
    <br /><br />
    <h2>Our Locations</h2>
    <p>WOW GATEWAYS puts you into paradise and makes you feel WOW</p>

    <div className="parent">
      <div className="div1">
        <div className="aboutus-location-title">
          Sittong
        </div>
        <img src={room2} alt="Sittong" width={"100%"} height={"100%"} />
      </div>
      <div className="div2">
      <div className="aboutus-location-title">
          Sittong
        </div>
        <img src={room2} alt="Sittong" width={"100%"} height={"100%"} />{" "}
      </div>
      <div className="div3">
      <div className="aboutus-location-title">
          Sittong
        </div>
        <img src={room2} alt="Sittong" width={"100%"} height={"100%"} />
      </div>
      <div className="div4">
      <div className="aboutus-location-title">
          Sittong
        </div>
        <img src={room2} alt="Sittong" width={"100%"} height={"100%"} />
      </div>
      <div className="div5">
      <div className="aboutus-location-title">
          Sittong
        </div>
        <img src={room2} alt="Sittong" width={"100%"} height={"100%"} />{" "}
      </div>
      <div className="div6">
      <div className="aboutus-location-title">
          Sittong
        </div>
        <img src={room2} alt="Sittong" width={"100%"} height={"100%"} />
      </div>
    </div>

   
  </div>
  )
}

export default Location