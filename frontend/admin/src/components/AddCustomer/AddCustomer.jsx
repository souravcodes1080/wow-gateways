import React, { useEffect, useState } from "react";
import "./addCustomer.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
function AddCustomer() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [homestayList, setHomestayList] = useState([]);
  const [carList, setCarList] = useState([]);
  // Inside your component function
  const [selectedHomestay, setSelectedHomestay] = useState(null);
  const [totalHomestayPrice, setTotalHomestayPrice] = useState(0);
  const [totalHomestayPriceC, setTotalHomestayPriceC] = useState(0);
  useEffect(() => {
    if (!localStorage.getItem("adminAuthorizationToken")) {
      navigate("/admin/login");
    }
  }, []);
  useEffect(() => {
    fetchHomestayNames();
    fetchCarList();
  }, []);

  const fetchHomestayNames = async () => {
    try {
      const response = await axios.get("http://localhost:8080/homestay");
      setHomestayList(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching homestay names:", error);
    }
  };

  const handleHomestayChange = (e) => {
    const homestayName = e.target.value;
    const homestay = homestayList.find((h) => h.homestayName === homestayName);

    setSelectedHomestay(homestay);

    // Update total price based on the selected homestay
    if (homestay) {
      const totalPrice = customerData.noOfAdults * homestay.b2b;
      setTotalHomestayPrice(totalPrice);
    }
  };

  const fetchCarList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/car");
      setCarList(response.data.cars);
      console.log(response.data);
    } catch (err) {
      console.log(err);
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
    tourPackage: "", //total b2b price for homestay * noOfAdults + no_of_childs2
    totalHomestayPriceB2B: "",
    advPaidB2B: "",
    guestRemainingBalance: "",
    dueB2B: "",
  });

  // Update total price when selected homestay or number of adults changes
  useEffect(() => {
    if (selectedHomestay) {
      const totalPrice = customerData.noOfAdults * selectedHomestay.b2b;
      const totalPriceC = customerData.noOfAdults * selectedHomestay.price;
      setTotalHomestayPriceC(totalPriceC);
      setTotalHomestayPrice(totalPrice);
    }
  }, [selectedHomestay, customerData.noOfAdults]);

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
        totalAmount: totalHomestayPriceC,
        paid: parseInt(customerData.paid),
        due: parseInt(totalHomestayPriceC - customerData.paid), //achaa
        totalHomestayPriceB2B: totalHomestayPrice, //achaa
        advPaidB2B: parseInt(customerData.advPaidB2B),
        guestRemainingBalance: parseInt(totalHomestayPriceC - customerData.paid),
        dueB2B: parseInt(totalHomestayPrice - customerData.advPaidB2B)
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
                onChange={(e) => {
                  handleHomestayChange(e);
                  handleInputChange(e); // Optionally, you might want to update other customer data
                }}
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
              <select
                required
                name="cars"
                value={customerData.cars}
                onChange={handleInputChange}
              >
                <option value="">Select Car</option>
                {carList.map((car) => (
                  <option key={car._id} value={car.carName}>
                    {car.carName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-wrapper">
              <label>Total Price (Customer)</label>
              <input
                required
                type="number"
                name="totalAmount"
                placeholder="Price"
                onChange={handleInputChange}
                value={totalHomestayPriceC}
              />
            </div>
            <div className="form-wrapper">
              <label>Paid (to WOW)</label>
              <input
                type="number"
                name="paid"
                placeholder="Total Amount Paid"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Guest Due</label>
              <input
                type="number"
                name="due"
                value={totalHomestayPriceC - customerData.paid} //achaa
                placeholder="Total Amount Due"
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
            <div className="form-wrapper">
              <label>Homestay Total Price(B2B)</label>
              <input
                required
                type="number"
                name="totalHomestayPriceB2B"
                placeholder="Price"
                onChange={handleInputChange}
                value={totalHomestayPrice}
              />
            </div>
            <div className="form-wrapper">
              <label>Adv. Paid (to Homestay by wow)</label>
              <input
                required
                type="number"
                name="advPaidB2B"
                placeholder="Price"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Guest Remaining Balance</label>
              <input
                required
                type="number"
                name="guestRemainingBalance"
                placeholder="Price"
                onChange={handleInputChange}
                value={totalHomestayPriceC - customerData.paid}
              />
            </div>
            <div className="form-wrapper">
              <label>B2B Homestay Due</label>
              <input
                required
                type="number"
                name="dueB2B"
                placeholder="Price"
                onChange={handleInputChange}
                value={totalHomestayPrice - customerData.advPaidB2B}
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
