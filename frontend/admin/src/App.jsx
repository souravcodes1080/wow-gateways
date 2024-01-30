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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin/addhomestay" element={<AddHomestay />} />
        <Route path="/admin/edithomestay/:id" element={<EditHomestay />} />

        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
