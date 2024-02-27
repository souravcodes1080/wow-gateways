import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./listHomestays.css";
import Sidebar from "../Sidebar/Sidebar";
import { FaEdit, FaHome, FaPlus, FaRupeeSign, FaTable } from "react-icons/fa";
import ReactPaginate from "react-paginate";

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

  //==============================  REACT PAGENATION   ====================

  const [itemOffset, setItemOffset] = useState(homestays.length > 0 ? 0 : undefined);
  const itemsPerPage = 3;

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = homestays.slice(itemOffset, endOffset).reverse();

  const pageCount = Math.ceil(homestays.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % homestays.length;
    setItemOffset(newOffset);
  };

  //==============================  REACT PAGENATION   ====================

  return (
    <div className="admin-panel-wrapper admin-panel-wrapper-add-homestay">
      <div className="dashboard-main-add-homestay">
        <div className="list-product">
          <div className="manage-homestay-header">
            <h5> <FaHome /> Manage Homestays</h5>
            <button onClick={() => { navigate("/admin/addhomestay") }}> <FaPlus />Add New Homestay </button>
          </div>
          <br />
          <table className="list-product-table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th style={{ width: "20%" }}>Homestay Name</th>
                <th style={{ width: "30%" }}>Address</th>
                <th style={{ width: "10%" }}>Phone Number</th>
                <th style={{ width: "15%" }}>Email</th>
                <th style={{ width: "10%" }}>Price / day</th>
                <th style={{ width: "5%" }}>Rooms</th>
                <th style={{ width: "10%" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {homestays.map((homestay, index) => (
                <tr key={index}>
                  <td>{homestay.homestayName}</td>
                  <td>{homestay.address}</td>
                  <td>{homestay.phoneNumber}</td>
                  <td>{homestay.email}</td>
                  <td>{homestay.price}</td>
                  <td>{homestay.noOfrooms}</td>
                  <td>
                    <button
                      onClick={() => {
                        updateHomestay(homestay._id);
                      }}
                      className="list-product-update-item"
                    >
                      <FaEdit /> &nbsp; Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            className="pagination"
          />
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
