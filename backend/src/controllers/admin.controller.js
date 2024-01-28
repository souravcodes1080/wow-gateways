import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {Admin} from '../models/admin.model.js';

// Admin registration (for demonstration purposes; in a real app, you might not have a public registration)
const register =  async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();
    res.status(201).send('Admin registered successfully');
  } catch (error) {
    res.status(500).send('Error registering admin');
  }
};

// Admin login
const login =  async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin || !await bcrypt.compare(password, admin.password)) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ id: admin._id }, 'wowgatewayshashed56565' ); // Replace 'secret_key' with an actual secret key
    res.json({ token });
  } catch (error) {
    res.status(500).send('Error logging in');
  }
};
export { register, login };