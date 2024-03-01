import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import "./login.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/admin/login",
        { username, password });

      localStorage.setItem("adminAuthorizationToken", response.data.token);
      localStorage.setItem("username", response.data.username);

      toast.success("Login Successfull", {
        onClose: () => {
          navigate("/");
        },
        autoClose: 3000,
      });
    } catch (error) {

      toast.error("Login Failed!", {
        onClose: () => {
        },
        autoClose: 3000,
      });

      console.log(error);
    }
  };

  return (
    <div className="login-form-wrapper">
      <ToastContainer />
      <form onSubmit={handleLogin}>
        <p>Admin Login</p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>

  );
};

export default Login;
