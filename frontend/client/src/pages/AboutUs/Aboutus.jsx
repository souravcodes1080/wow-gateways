import React from "react";
import "./aboutus.css";
import room2 from "../../../public/pictures/room2.jpg";
function Aboutus() {
  return (
    <div className="container">
      <div className="about-container">
        <div className="about-content">
          <h1>
            About <span>WOW Gateways</span>
          </h1>
          <br />
          <p>
            <span className="i">I</span>ts winter of 2018, and there’s a rush in
            the hills with the huge influx of tourists, but there is no
            systematic facilities that can be accessed by the tourists. From
            this scar in the moon, We a team of young enthusiastic individuals
            got the inspiration to change the scenario.
          </p>
          <p>
            The journey of WOW GATEWAYS started with the idea to solve the
            issues that the tourists were facing and to acts as a bridge between
            the tourists and the heavenly beauty of the hills. We always knew
            that if the tourism rises in our place it will apparently help the
            locals in their livelihood and other multifaceted way. The issues
            such as simple bookings,(online facility) tourists guide, food
            preferences, traveling automobiles, location updates, language
            barriers and the list is long, were the things that we wanted to
            solve as our priority.
          </p>
        </div>
        <div className="about-image">
          {/* Image is added as a background image in CSS */}
        </div>
      </div>

     
    </div>
  );
}

export default Aboutus;
