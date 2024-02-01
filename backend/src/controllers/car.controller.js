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
      noOfSeats,
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
      noOfSeats,
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
    const cars = await Car.find();

    if (!cars || cars.length === 0) {
      return res.status(404).json({
        message: "No Cars found.",
        status: false,
      });
    }

    return res.status(200).json({
      message: "Cars fetched successfully.",
      status: true,
      cars,
    });
  } catch (error) {
    res.status(400).json({ message: "Error fetching car list." });
  }
};

export { addCar, getAllCar };
