import React from "react";
import "./whatsappButton.css";
import { FaWhatsapp } from "react-icons/fa";
function WhatsappButton() {
  return (
    <div>
      <div className="whatsapp-button-wrapper">
        <a href="https://wa.link/ihzr4r" target="_blank">
          <div className="whatapp-button">
            <FaWhatsapp className="whatsapp-icon" />
          </div>
        </a>
      </div>
    </div>
  );
}

export default WhatsappButton;
