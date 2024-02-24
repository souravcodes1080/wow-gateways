import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./listHomestays.css";
import Sidebar from "../Sidebar/Sidebar";
import { FaEdit, FaHome, FaPlus, FaRupeeSign, FaTable } from "react-icons/fa";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ListHomestays() {
  const [homestays, setHomestays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("adminAuthorizationToken")) {
      navigate("/admin/login");
    }

    const fetchHomestays = async () => {
      try {
        const response = await axios.get("http://localhost:8080/homestay");
        setHomestays(response.data);
        console.log(response.data);

        // toast.success("Homestay Listed successfully!", {
        //   onClose: () => {
        //   },
        //   autoClose: 5000,
        // });

      } catch (error) {

        toast.error("Fetch Unsuccessfull!", {
          className: 'custom-toast-success',
          autoClose: 5000,
        });
        console.log(error);
      }
    };

    fetchHomestays();
  }, []);

  const updateHomestay = (id) => {
    navigate(`/admin/edithomestay/${id}`);
  };

  return (
    <div className="admin-panel-wrapper admin-panel-wrapper-add-homestay">
      <div className="dashboard-main-add-homestay">
        <div className="list-product">
          <div className="manage-homestay-header">
            <h5> <FaHome /> Manage Homestays</h5>
            <button onClick={() => { navigate("/admin/addhomestay") }}> <FaPlus />Add New Homestay </button>
          </div>
          <br />
          <table className="list-product-table">
            <thead>
              <tr>
                {/* <th className="column-picture">Picture</th> */}
                <th className="column-name">Homestay Name</th>
                <th className="column-address">Address</th>
                <th className="column-phone">Phone Number</th>
                <th className="column-email">Email</th>
                <th className="column-price">Price / day</th>
                <th className="column-room">Rooms</th>
                <th className="column-price">Action</th>
              </tr>
            </thead>
            <tbody>
              {homestays.map((homestay, index) => (
                <tr key={index}>
                  {/* <td className="column-picture">
                    <img src={homestay.images[4]} alt={homestay.homestayName} />
                  </td> */}
                  <td className="column-name">{homestay.homestayName}</td>
                  <td className="column-address">{homestay.address}</td>
                  <td className="column-phone">{homestay.phoneNumber}</td>
                  <td className="column-email">{homestay.email}</td>
                  <td className="column-price">{homestay.price}</td>
                  <td className="column-room">{homestay.noOfrooms}</td>
                  {/* <td className="column-price"  >{homestay.noOfCars}</td> */}
                  <td>
                    <button
                      onClick={() => {
                        updateHomestay(homestay._id);
                      }}
                      className="list-product-update-item"
                    >
                      <FaEdit/> &nbsp; Update
                    </button>
                  </td>
                  {/* <td>
                    <button
                      onClick={() => {
                        updateHomestay(homestay._id);
                      }}
                      className="list-product-delete-item"
                    >
                      Delete
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListHomestays;
{
  /* <div className="list-product-format-main">
<p>Picture</p>
<p>Homestay Name</p>
<p>Address</p>
<p>Phone Number</p>
<p>Email</p>
<p>Price / day</p>
<p>Rooms</p>
<p>Cars</p>
</div>
<div className="list-product-all-products">
<hr />
{homestays.map((homestay, index) => {
  return (
    <div key={index}>
      <div
        
        className="list-product-format-main list-product-format"
      >
        <img
          className="list-product-product-icon"
          src={homestay.images[4]}
          alt={homestay.images[4]}
        />
        <p>{homestay.homestayName}</p>
        <p>{homestay.address}</p>
        <p>{homestay.phoneNumber}</p>
        <p>{homestay.email}</p>
        <p>Rs. {homestay.price}</p>
        <p>{homestay.noOfrooms}</p>
        <p>{homestay.noOfCars}</p>
          <button
          onClick={()=>{updateHomestay(homestay._id)}}
            className="list-product-update-item"
          >Update</button>
         <button
          onClick={()=>{updateHomestay(homestay._id)}}
            className="list-product-delete-item"
          >Delete</button> 
      </div>
      <hr />
    </div>
  );
})}
</div> */
}
