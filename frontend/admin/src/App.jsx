import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import AddHomestay from "./components/AddHomestay/AddHomestay";
import EditHomestay from "./components/EditHomestay/EditHomestay";
import Navbar from "./components/Navbar/Navbar";
import ListHomestays from "./components/ListHomestays/ListHomestays";
import AddCustomer from "./components/AddCustomer/AddCustomer";
import ListBooking from "./components/ListBookings/ListBookings";
import AddCar from "./components/AddCar/AddCar";
import ListCar from "./components/ListCar/ListCar";
import EditBooking from "./components/EditBooking/EditBooking";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  return (
    <Router>
    <Navbar />
    {localStorage.getItem("adminAuthorizationToken") && <Sidebar />}
    {/* <Sidebar /> */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin/addhomestay" element={<AddHomestay />} />
        <Route path="/admin/addcustomer" element={<AddCustomer />} />
        <Route path="/admin/addcar" element={<AddCar />} />



        <Route path="/admin/homestaylist" element={<ListHomestays />} />
        <Route path="/admin/bookinglist" element={<ListBooking />} />
        <Route path="/admin/carlist" element={<ListCar/>} />


        <Route path="/admin/edithomestay/:id" element={<EditHomestay />} />
        <Route path="/admin/editbooking/:id" element={<EditBooking />} />

        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
