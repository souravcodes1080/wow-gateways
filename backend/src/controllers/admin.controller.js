import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";

// Admin registration (for demonstration purposes; in a real app, you might not have a public registration)
const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();
    res.status(201).send("Admin registered successfully");
  } catch (error) {
    res.status(500).send("Error registering admin");
  }
};

// Admin login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

   
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

   
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateJwtToken(admin._id);

    res.json({ token, username });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};


const generateJwtToken = (adminId) => {
  return jwt.sign({ id: adminId }, "wowgateways1029384756");
};

export { register, login };
