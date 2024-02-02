import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import AddHomestay from "../AddHomestay/AddHomestay";
import EditHomestay from "../EditHomestay/EditHomestay";
import Sidebar from "../Sidebar/Sidebar";
import logo from "../../../public/logo.png"
const Dashboard = () => {
  const [homestays, setHomestays] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("adminAuthorizationToken")) {
      navigate("/admin/login");
    }

    const fetchHomestays = async () => {
      try {
        const response = await axios.get("http://localhost:8080/homestay");
        setHomestays(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHomestays();
  }, []);
  return (
    <>
      <div className="admin-panel-wrapper">
       
        <div className="dashboard-main">
       
               <div className="box1 box">
                <div className="box1-header1">
                  Total Bookings
                </div>
                <p>60+</p>
               </div>
               <div className="box2 box">
               <div className="box2-header2">
                Total Homestays
               </div>
                <p>20+</p>
               </div>
               <div className="box3 box">
               <div className="box3-header3">
                Total Revenue
               </div>
                <p>45,000+</p>
               </div>
  
        </div>

      </div>
        <div className="admin-panel-footer"><p>Made with ❤️ by Sourav</p></div>
    </>
  );
};

export default Dashboard;


  {/* <div>
    


     <div>
        {homestays.map(homestay => (
          <div key={homestay._id}>
          <img src={homestay.images[0]} alt="" width={'200px'}/>
            <h3>{homestay.homestayName}</h3>
            <p>{homestay.address}</p>
            <p>{homestay.price}/day</p>
            {/* Display other homestay details 
            <Link to={`/admin/edithomestay/${homestay._id}`}>Edit</Link>
            <Link>Delete</Link>
            <hr />
          </div>
        ))}
      </div>
    </div> */}