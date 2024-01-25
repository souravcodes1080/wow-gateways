import React from 'react'
import "./footer.css"
import { CiGlobe } from "react-icons/ci";
import { PiCurrencyInr } from "react-icons/pi";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
function Footer() {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-top-left">
              <h4>Support</h4>
              <ul>
                <li>Help Center</li>
                <li>Help Center</li>
                <li>Help Center</li>
                <li>Help Center</li>
              </ul>
            </div>
            <div className="footer-top-middle">
            <h4>Features</h4>
              <ul>
                <li>24 x 7 Homestay Booking</li>
                <li>Delicious Food</li>
                <li>24 x 7 Car Service</li>
                <li>Tour packages</li>
              </ul>
            </div>
            <div className="footer-top-right">
            <h4>Features</h4>
              <ul>
                <li>Newsroom</li>
                <li>New Features</li>
                <li>Help Center</li>
                <li>Tour packages</li>
              </ul>
            </div>
          </div>
          <hr className='footer-hr' />
          <div className="footer-bottom">
            <div className="footer-bottom-left">
              <p><a href="">@ 2024 Wow gateways, Inc. </a></p>
              <p><a href="">Privacy</a></p>
              <p><a href="">Terms</a></p>
              <p><a href="">Company Details</a></p>
            </div>
            <div className="footer-bottom-right">
              <p> <CiGlobe/>  English</p>
              <p> <PiCurrencyInr/> INR</p>
              <div className="footer-icons">
                <a href=""><FaFacebook/>  </a>
                <a href=""> <FaInstagram/> </a>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer