import mongoose from "mongoose";


const carSchema = new mongoose.Schema({
   carName:{
    type: String,
   },
   driverName:{
    type: String
   },
   driverPhoneNumber:{
    type: Number
   },
   driverPhoneNumberAlt:{
    type: Number
   },
   carType:{
    type: String,
   },
   noOfSeats:{
    type: Number,
   },
   drivingLocation:{
    type: String,
   },
   ac:{
    type: Boolean,
    default: false,
   },
   condition:{
    type: String,
   },
   carRating:{
    type: Number,
   },
});



export const Car = mongoose.model("Car", carSchema);
