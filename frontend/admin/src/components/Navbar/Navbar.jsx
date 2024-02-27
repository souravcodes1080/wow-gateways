import React, { useState } from "react";
import "./navbar.css";
import logo2 from "../../../public/logo3.png";
import { FaRegUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const [isLogout, setIsLogout] = useState(false);
  const navigate = useNavigate();

  const toggleLogout = () => {
    setIsLogout(!isLogout);
  };

  const adminLogout = () =>{
    localStorage.removeItem("adminAuthorizationToken");
    localStorage.removeItem("username");
    setIsLogout(false);
    navigate("/admin/login")
  }
  return (
    <>
      <div className="header-wrapper">
        <header>
          <div className="header-container">
            <div className="header-logo">
              <img src={logo2} alt="wow_gateways_logo" width={"100%"} />
            </div>
            <div className="header-desc">
              
                 {localStorage.getItem("adminAuthorizationToken") ? (
                 (
                  <div className="logout">
                  <FaRegUserCircle /> &nbsp;&nbsp;&nbsp;&nbsp;
                  <FaSignOutAlt onClick={adminLogout}  />
                  </div>
                ) 
              ) : (
                ""
              )} 
              
              
              
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default Navbar;
