import React from 'react'
import "./sidebar.css"
import { useNavigate } from 'react-router-dom';
function Sidebar() {
    const navigate = useNavigate();

  return (
    <>
        <div className="dashboard-sidebar">
          <ul>
          <li>
            <button onClick={() => {
                  navigate("/admin/addcustomer");
                }}>
                Add Customer
            </button>
          </li>
            <li>
              <button
                onClick={() => {
                  navigate("/admin/addhomestay");
                }}
              >
                Add Homestay
              </button>
            </li>
            <li>
            <button onClick={() => {
                  navigate("/admin/addcar");
                }}>
                Add Cars
            </button>
            </li>
            <li>
            <button onClick={() => {
                  navigate("/admin/homestaylist");
                }}>
                List Homestays
            </button>
            </li>
            <li>
            <button onClick={() => {
                  navigate("/admin/bookinglist");
                }}>
                List Booking
            </button>
            </li>
            <li>
            <button onClick={() => {
                  navigate("/admin/carlist");
                }}>
                Manage Cars
            </button>
            </li>
            
          </ul>
        </div>
    </>
  )
}

export default Sidebar