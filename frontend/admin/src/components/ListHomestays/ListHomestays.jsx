import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./listHomestays.css";
import Sidebar from "../Sidebar/Sidebar";

function ListHomestays() {
  const [homestays, setHomestays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()
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
    <div className="admin-panel-wrapper">
      <Sidebar />
      <div className="dashboard-mains">
        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              {homestays.map((homestay) => (
                <div key={homestay._id}>
                  <img src={homestay.images[5]} alt="" width={"200px"} />
                  <h3>{homestay.homestayName}</h3>
                  <p>{homestay.address}</p>
                  <p>{homestay.price}/day</p>
                  Display other homestay details
                  <Link to={`/admin/edithomestay/${homestay._id}`}>Edit</Link>
                  <Link>Delete</Link>
                  <hr />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListHomestays;
