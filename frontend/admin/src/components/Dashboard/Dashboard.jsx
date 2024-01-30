import React, { useEffect, useState } from 'react';
import  "./dashboard.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Dashboard = () => {
  const [homestays, setHomestays] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("adminAuthorizationToken")){
    navigate("/admin/login")

  }

  const fetchHomestays = async () => {
    try {
      const response = await axios.get('http://localhost:8080/homestay');
      setHomestays(response.data);
    } catch (error) {
      console.log(error)
    }
  };

  fetchHomestays();
  }, [])
  return (
    <div>
     <button onClick={()=>{navigate("/admin/addhomestay")}}>
      Add New Homestay
     </button>


     <div>
        {homestays.map(homestay => (
          <div key={homestay._id}>
          <img src={homestay.images[0]} alt="" width={'200px'}/>
            <h3>{homestay.homestayName}</h3>
            <p>{homestay.address}</p>
            <p>{homestay.price}/day</p>
            {/* Display other homestay details */}
            <Link to={`/admin/edithomestay/${homestay._id}`}>Edit</Link>
            <Link>Delete</Link>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;