import React, { useEffect, useState } from 'react';
import { useParams,  useNavigate } from 'react-router-dom';
import "./editHomestay.css"
import axios from 'axios';

const EditHomestay = () => {
    const navigate = useNavigate()
  const [homestayData, setHomestayData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchHomestay = async () => {
      try {
        const response = await axios.get("http://localhost:8080/homestay");
        setHomestayData(response.data);
      } catch (error) {
        console.log(error)
      }
    };

    fetchHomestay();
  }, [id]);

  const handleInputChange = (e) => {
    setHomestayData({ ...homestayData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/homestay/${id}`,homestayData)
       navigate("/")
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="homestayName"
        placeholder="Homestay Name"
        value={homestayData.homestayName || ''}
        onChange={handleInputChange}
      />
       <input
        type="number"
        name="phoneNumber"
        placeholder="Homestay phonenumber"
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Homestay Email"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Homestay price/day"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Homestay Address"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="noOfrooms"
        placeholder="Homestay Rooms"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="noOfcarss"
        placeholder="Homestay Cars"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="googleMapLink"
        placeholder="Homestay Google Map"
        onChange={handleInputChange}
      />
     
      <button type="submit">Update Homestay</button>
    </form>
  );
};

export default EditHomestay;