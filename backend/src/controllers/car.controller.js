import mongoose from "mongoose";
import {Car} from "../models/car.model.js"

const addCar = async (req, res) =>{
    try {
        
    } catch (error) {
        res.status(400).json({message: "Error adding car."})
    }
}
const getAllCar = async (req, res) =>{
    try {
        
    } catch (error) {
        res.status(400).json({message: "Error fetching car list."})
    }
}

export {addCar, getAllCar}