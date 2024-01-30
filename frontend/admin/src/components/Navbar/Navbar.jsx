import React, { useState } from "react";
import "./navbar.css";
import logo2 from "../../../public/logo2.png";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const [isLogout, setIsLogout] = useState(false);
  const navigate = useNavigate();

  const toggleLogout = () => {
    setIsLogout(!isLogout);
  };

  const adminLogout = () =>{
    localStorage.removeItem("adminAuthorizationToken");
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
              <h5>
                Admin Panel{" "}
                <p>
                  <FaRegUserCircle
                    className="admin-logo"
                    onClick={toggleLogout}
                  />
                </p>
              </h5>
              {localStorage.getItem("adminAuthorizationToken") ? (
                isLogout ? (
                  <div className="logout-hover">
                    <button onClick={adminLogout}>Logout</button>
                  </div>
                ) : (
                  <></>
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </header>
      </div>

      <hr />
    </>
  );
}

export default Navbar;
