import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./listHomestays.css";
import Sidebar from "../Sidebar/Sidebar";
import { FaEdit, FaHome, FaPlus, FaRupeeSign, FaTable } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ListHomestays() {
  const [homestays, setHomestays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [originalHomestays, setOriginalHomestays] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHomestays, setFilteredHomestays] = useState([]);
  const [noResults, setNoResults] = useState(false); // State to track if no results are found
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("adminAuthorizationToken")) {
      navigate("/admin/login");
    }

    const fetchHomestays = async () => {
      try {
        const response = await axios.get("http://localhost:8080/homestay");
        setHomestays(response.data);
        setOriginalHomestays(response.data);
        console.log(response.data);
      } catch (error) {
        toast.error("Fetch Unsuccessful!", {
          className: "custom-toast-success",
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

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value === "") {
      // If the search query is empty, show all original bookings
      setHomestays(originalHomestays);
      setFilteredHomestays([]);
      setNoResults(false);
      return;
    }

    const filtered = originalHomestays.filter(
      (homestay) =>
        (homestay.homestayName &&
          homestay.homestayName.toLowerCase().includes(value)) ||
        (homestay.location && homestay.location.toLowerCase().includes(value))
    );

    setFilteredHomestays(filtered);
    setNoResults(filtered.length === 0);
  };

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = homestays
    .slice(
      Math.max(homestays.length - endOffset, 0),
      homestays.length - itemOffset
    )
    .reverse();
  const pageCount = Math.ceil(homestays.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  return (
    <div className="admin-panel-wrapper admin-panel-wrapper-add-homestay">
      <div className="dashboard-main-add-homestay">
        <div className="list-product">
          <div className="manage-homestay-header">
            <h5>
              {" "}
              <FaHome /> Manage Homestays
            </h5>
            <div>

            <input style={{paddingLeft:"20px"}} type="text" placeholder="Search Homestays" onChange={handleSearch} />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button
              onClick={() => {
                navigate("/admin/addhomestay");
              }}
            >
              {" "}
              <FaPlus />
              Add New Homestay{" "}
            </button>
            </div>
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
            {noResults ? (
              <tbody>
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    No search results found
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {(searchQuery ? filteredHomestays : currentItems).map(
                  (homestay, index) => (
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
                  )
                )}
              </tbody>
            )}
          </table>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
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
