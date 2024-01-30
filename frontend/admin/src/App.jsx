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

const App = () => {
  return (
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin/addhomestay" element={<AddHomestay />} />
        <Route path="/admin/homestaylist" element={<ListHomestays />} />
        <Route path="/admin/edithomestay/:id" element={<EditHomestay />} />

        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
