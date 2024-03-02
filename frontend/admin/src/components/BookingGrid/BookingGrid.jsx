import React, { useEffect, useState } from 'react'
import './bookingGrid.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaBook } from 'react-icons/fa';
import Table from '../Table/Table';


function BookingGrid() {
    const [homestaylist, setHomestayList] = useState([]);
    const [selectedHomestay, setSelectedHomestay] = useState("");
    const [noOfRooms, setNoOfRooms] = useState(0);
    useEffect(() => {
        if (!localStorage.getItem("adminAuthorizationToken")) {
            navigate("/admin/login");
        }
        fetchHomestayList()
    }, []);
    
  
    const fetchHomestayList = async () => {
        const response = await axios.get("http://localhost:8080/homestay/homestayName")
        setHomestayList(response.data)
        
        console.log(response.data)
    }

    const handleHomestayNameChange = (e) => {
        setSelectedHomestay(e.target.value)
        const selectedHomestayObj = homestaylist.find(h => h.homestayName === e.target.value)
        setNoOfRooms(selectedHomestayObj ? selectedHomestayObj.noOfrooms : null)
    }

    const handleRooms = () =>{

    }
    return (
        <>
            <div className="">
                <div className="admin-booking-list-container">
                    <div className="manage-customer-header manage-homestay-header">
                        <h5>
                            <FaBook />
                            Booking Grid
                        </h5>

                    </div>
                    <div className="">
                        <select value={selectedHomestay} name="" id="" onChange={handleHomestayNameChange}>
                            <option value="">Select Homestay</option>
                            {homestaylist.map((item, index) => (
                                <option key={index} value={item.homestayName}>{item.homestayName}</option>

                            ))}
                        </select>
                    </div>
                    {selectedHomestay === "" ? <p>No homestay selected</p> : <div><p>{selectedHomestay}</p>
                     <Table homestayName={selectedHomestay}  rooms={noOfRooms}/>
          
                      </div>}
                </div>
            </div>

        </>
    )
}

export default BookingGrid