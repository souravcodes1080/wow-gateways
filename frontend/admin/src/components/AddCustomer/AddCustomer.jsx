import React, { useEffect, useState } from "react";
import "./addCustomer.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaMinus, FaPlus } from "react-icons/fa";
function AddCustomer() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [homestayList, setHomestayList] = useState([]);
  const [customerData, setCustomerData] = useState({
    customerName: "",
    customerPhoneNumber: "",
    customerEmail: "",
    noOfAdults: "0",
    noOfchilds1: "0",
    noOfchilds2: "0",
    totalHomestayPriceC: "0",
    paid: "0",
    due: "0",
    note: "",
    totalHomestayPriceB2B: "0",
    advPaidB2B: "0",
    guestRemainingBalance: "0",
    dueB2B: "0",
  });
  const [tourData, setTourData] = useState([
    {
      homestayName: "",
      checkIn: "",
      checkOut: "",
      price: "0",
      car: "",
      carCost: "0",
      rooms: "",
    },
  ]);
  const handleTourChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTour = [...tourData];
    updatedTour[index][name] = value;
    setTourData(updatedTour);
  };


  const calculateTotalHomestayPriceC = () => {
    let totalPriceC = 0;
    tourData.forEach((tour) => {
      const homestay = homestayList.find(
        (h) => h.homestayName === tour.homestayName

      );

      if (homestay) {
        const price = homestay.price;
        const checkIn = new Date(tour.checkIn);
        const checkOut = new Date(tour.checkOut);
        const childCost = parseInt(customerData.noOfchilds2);
        const timeDifference = checkOut - checkIn;
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
        const totalPriceForThisTour = price * daysDifference;
        totalPriceC += totalPriceForThisTour;
        const carCost = parseInt(tour.carCost, 10);
        const guestCost = parseInt(customerData.noOfAdults);
        if(childCost > 0){
          totalPriceC *= (guestCost + (childCost/2));
        }else{
          totalPriceC *= guestCost;
        }
        totalPriceC += carCost;
        
      }

    });
    setTotalHomestayPriceC(totalPriceC);
  };
  

  useEffect(() => {
    calculateTotalHomestayPriceC();
  }, [tourData.flat()]);


  const handleAddTour = () => {
    setTourData([
      ...tourData,
      {
        homestayName: "",
        checkIn: "",
        checkOut: "",
        price: "",
        car: "",
        carCost: "",
        rooms: "",
      },
    ]);
  };

  const handleRemoveTour = (index) => {
    const updatedTour = [...tourData];
    updatedTour.splice(index, 1);
    setTourData(updatedTour);
    calculateTotalHomestayPriceC();
  };
  const [totalHomestayPrice, setTotalHomestayPrice] = useState(0);
  const [totalHomestayPriceC, setTotalHomestayPriceC] = useState(0);

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
      const response = await axios.get("http://localhost:8080/homestay/homestayName");
      setHomestayList(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching homestay names:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updatedCustomerData = {
        ...customerData,
        totalHomestayPriceC: totalHomestayPriceC.toString(), // Ensure totalHomestayPriceC is a string
        due: totalHomestayPriceC - customerData.paid,
      };
  
      // Include tour data in the form data
      const formData = {
        ...updatedCustomerData,
        tour: tourData,
      };
      // Perform your axios request to submit the form data
      await axios.post("http://localhost:8080/home/booking", formData);

      toast.success("Customer added successfully!", {
        onClose: () => {
          navigate("/");
        },
        autoClose: 5000,
      });
    } catch (error) {
      let errorMessage = "Error booking. Please try again later.";

      if (error.response) {
        const { status, data } = error.response;
        if (status === 400 && data.message) {
          errorMessage = data.message;
        }
      } else if (error.request) {
        errorMessage = "No response from the server. Please try again later.";
      } else {
        errorMessage = "An unexpected error occurred. Please try again later.";
      }
      toast.error(errorMessage, {
        className: "custom-toast-error",
        autoClose: 3000,
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-panel-wrapper-add-homestay">
      <ToastContainer />
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
              <label>Customer Phone Number</label>
              <input
                type="number"
                required
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
              <label>Number of adults</label>
              <input
                type="number"
                required
                name="noOfAdults"
                placeholder="Number of Adults"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-wrapper">
              <label>Number of Childs(0-4 yrs.)</label>
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

            <div className="tour-form-data">
              {tourData.map((tourItem, index) => (
                <div key={index}>
                  <h3>Tour {index + 1}</h3>
                  <div className="form-wrapper">
                    <label>Homestay Name</label>
                    <select
                      required
                      name="homestayName"
                      value={tourItem.homestayName}
                      onChange={(e) => {
                        handleTourChange(index, e)
                      }}
                    >
                      <option value="">Select Homestay</option>
                      {homestayList.map((homestay) => (
                        <option
                          key={homestay._id}
                          value={homestay.homestayName}
                        >
                          {homestay.homestayName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-wrapper">
                    <label>Check In</label>
                    <input
                      type="date"
                      name="checkIn"
                      value={tourItem.checkIn}
                      onChange={(e) => handleTourChange(index, e)}
                    />
                  </div>
                  <div className="form-wrapper">
                    <label>Check Out</label>
                    <input
                      type="date"
                      name="checkOut"
                      value={tourItem.checkOut}
                      onChange={(e) => handleTourChange(index, e)}
                    />
                  </div>
                  <div className="form-wrapper">
                    <label>Advance Paid B2B</label>
                    <input
                      type="number"
                      name="price"
                      value={tourItem.price}
                      onChange={(e) => handleTourChange(index, e)}
                    />
                  </div>
                  <div className="form-wrapper">
                    <label>Car</label>
                    <input
                      type="text"
                      name="car"
                      placeholder="Car Note"
                      value={tourItem.car}
                      onChange={(e) => handleTourChange(index, e)}
                    />
                  </div>
                  <div className="form-wrapper">
                    <label>Car Cost</label>
                    <input
                      type="number"
                      name="carCost"
                      placeholder="Car price"
                      value={tourItem.carCost}
                      onChange={(e) => handleTourChange(index, e)}
                    />
                  </div>
                  <div className="form-wrapper rooms-form">
                    <label>Rooms</label>
                    <input
                      type="number"
                      name="rooms"
                      placeholder="Number of Rooms"
                      value={tourItem.rooms}
                      onChange={(e) => handleTourChange(index, e)}
                    />
                  </div>
                  {/* Add more fields as needed */}
                  <button
                    className="remove-tour"
                    type="button"
                    onClick={() => handleRemoveTour(index)}
                  >
                    <FaMinus /> Remove Tour
                  </button>
                </div>
              ))}
            </div>

            <button className="add-tour" type="button" onClick={handleAddTour}>
              <FaPlus /> Add Tour
            </button>
          </div>
          <div className="form-right">
            <div className="form-wrapper">
              <label>Total Price (Customer)</label>
              <input
                disabled
                required
                type="number"
                name="totalHomestayPriceC"
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
            {/* <div className="form-wrapper">
              <label>Guest Due</label>
              <input
                disabled
                type="number"
                name="due"
                value={totalHomestayPriceC - customerData.paid}
                placeholder="Total Amount Due"
              />
            </div> */}
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
            {/* <div className="form-wrapper">
              <label>Homestay Total Price(B2B)</label>
              <input
                disabled
                required
                type="number"
                name="totalHomestayPriceB2B"
                placeholder="Price"
                onChange={handleInputChange}
                value={totalHomestayPrice}
              />
            </div> */}
            {/* <div className="form-wrapper">
              <label>Adv. Paid (to Homestay by wow)</label>
              <input
                required
                type="number"
                name="advPaidB2B"
                placeholder="Price"
                onChange={handleInputChange}
              />
            </div> */}
            <div className="form-wrapper">
              <label>Guest Remaining Balance</label>
              <input
                disabled
                required
                type="number"
                name="due"
                placeholder="Price"
                onChange={handleInputChange}
                value={totalHomestayPriceC - customerData.paid}
              />
            </div>
            {/* <div className="form-wrapper">
              <label>B2B Homestay Due</label>
              <input
                disabled
                required
                type="number"
                name="dueB2B"
                placeholder="Price"
                onChange={handleInputChange}
                value={totalHomestayPrice - customerData.advPaidB2B}
                className={totalHomestayPrice - customerData.advPaidB2B >= 0 ? "green" : "red"}
              />
            // </div> */}


            {/* <button type="reset">
              Reset
            </button> */}


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
