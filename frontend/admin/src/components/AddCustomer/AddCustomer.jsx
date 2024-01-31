import React, { useEffect, useState } from "react";
import "./addCustomer.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
function AddCustomer() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [homestayList, setHomestayList] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("adminAuthorizationToken")) {
      navigate("/admin/login");
    }
  }, []);
  useEffect(() => {
    fetchHomestayNames();
  }, []);

  const fetchHomestayNames = async () => {
    try {
      const response = await axios.get("http://localhost:8080/homestay");
      setHomestayList(response.data);
    } catch (error) {
      console.error("Error fetching homestay names:", error);
    }
  };
  const [customerData, setCustomerData] = useState({
    customerName: "",
    customerPhoneNumber: "",
    customerEmail: "",
    checkIn: "",
    checkOut: "",
    noOfAdults: "",
    noOfchilds1: "",
    noOfchilds2: "",
    homestayName: "",
    noOfRoomsBooked: "",
    totalAmount: "",
    paid: "",
    due: "",
    note: "",
    cars: "",
    tourPackage: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = {
        ...customerData,
        // Convert number inputs to integers
        noOfAdults: parseInt(customerData.noOfAdults),
        noOfchilds1: parseInt(customerData.noOfchilds1),
        noOfchilds2: parseInt(customerData.noOfchilds2),
        noOfRoomsBooked: parseInt(customerData.noOfRoomsBooked),
        totalAmount: parseInt(customerData.totalAmount),
        paid: parseInt(customerData.paid),
        due: parseInt(customerData.due),
      };

      // Make the POST request with formData
      await axios.post("http://localhost:8080/home/booking", formData);

      alert("Customer booked successfully!");
      navigate("/");
    } catch (error) {
      let errorMessage = "Error booking. Please try again later."; // Default error message

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { status, data } = error.response;
        if (status === 400 && data.message) {
          errorMessage = data.message; // Use the specific error message from the server
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response from the server. Please try again later.";
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = "An unexpected error occurred. Please try again later.";
      }

      alert(errorMessage); // Show the error message to the user
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-panel-wrapper-add-homestay">
      <Sidebar />
      <div className="dashboard-main-add-homestay">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-left">
            <div className="form-wrapper">
              <label>Customer Name</label>
              <input
                required
                type="text"
                name="customerName"
                placeholder="Customer Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Homestay Name</label>
              <select
                required
                name="homestayName"
                value={customerData.homestayName}
                onChange={handleInputChange}
              >
                <option value="">Select Homestay</option>
                {homestayList.map((homestay) => (
                  <option key={homestay._id} value={homestay.homestayName}>
                    {homestay.homestayName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-wrapper">
              <label>Package</label>
              <select
                required
                type="text"
                name="tourPackage"
                placeholder="Homestay Name"
                onChange={handleInputChange}
              >
                <option value="">Select packages</option>
                <option value="premium">Premium</option>
                <option value="dulux">Dulux</option>
                <option value="normal">Normal</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div className="form-wrapper">
              <label>Customer Phone Number</label>
              <input
                type="number"
                name="customerPhoneNumber"
                placeholder="Customer phonenumber"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Customer Email Address</label>
              <input
                type="email"
                name="customerEmail"
                placeholder="Customer Email"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Check In Date</label>
              <input type="date" name="checkIn" onChange={handleInputChange} />
            </div>
            <div className="form-wrapper">
              <label>Check Out Date</label>
              <input type="date" name="checkOut" onChange={handleInputChange} />
            </div>
            <div className="form-wrapper">
              <label>Number of Rooms booked</label>
              <input
                type="number"
                name="noOfRoomsBooked"
                placeholder="Rooms Booked"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Number of adults</label>
              <input
                type="number"
                name="noOfAdults"
                placeholder="Number of Adults"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Number of Childs(0-5 yrs.)</label>
              <input
                type="number"
                name="noOfchilds1"
                placeholder="Number of Children"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Number of Childs(5-9 yrs.)</label>
              <input
                type="number"
                name="noOfchilds2"
                placeholder="Number of Children"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-right">
            <div className="form-wrapper">
              <label>Cars</label>
              <select name="cars" onChange={handleInputChange}>
                <option value="">Select Car</option>
                <option value="Wagnor">Wagnor</option>
                <option value="Alto">Alto</option>
                <option value="Sumo Gold">Sumo Gold</option>
                <option value="Bolero">Bolero</option>
                <option value="Fortuner">Fortuner</option>
                <option value="Spresso">Spresso</option>
                <option value="Swift Desire">Swift Desire</option>
                <option value="Small Car">Small Car</option>
                <option value="8 Seater Car">8 Seater Car</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-wrapper">
              <label>Total Price</label>
              <input
                required
                type="number"
                name="totalAmount"
                placeholder="Price"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Paid</label>
              <input
                type="number"
                name="paid"
                placeholder="Total Amount Paid"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Due</label>
              <input
                type="number"
                name="due"
                placeholder="Total Amount Due"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Note</label>
              <textarea
                className="address-textarea"
                type="text"
                name="note"
                placeholder="Customer note"
                onChange={handleInputChange}
              />
            </div>
            <button
              className="add-homestay"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding Customer..." : "Add Customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCustomer;
