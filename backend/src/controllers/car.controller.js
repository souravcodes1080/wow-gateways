import mongoose from "mongoose";
import { Car } from "../models/car.model.js";

const addCar = async (req, res) => {
  try {
    const {
      carName,
      driverName,
      driverPhoneNumber,
      driverPhoneNumberAlt,
      carType,
      noOPfSeats,
      drivingLocation,
      ac,
      condition,
      carRating,
    } = req.body;

    const newCar = new Car({
      carName,
      driverName,
      driverPhoneNumber,
      driverPhoneNumberAlt,
      carType,
      noOPfSeats,
      drivingLocation,
      ac,
      condition,
      carRating,
    });

    await newCar.save();
    
    res.status(201).json({ message: "Car Added" });
  } catch (error) {
    res.status(400).json({ message: "Error adding car." });
  }
};
const getAllCar = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ message: "Error fetching car list." });
  }
};

export { addCar, getAllCar };
