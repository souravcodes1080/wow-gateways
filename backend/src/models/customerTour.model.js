import mongoose from "mongoose";
// import { Booking } from "./booking.model.js";

const tourArray = new mongoose.Schema({
    from: {
        type: String,
        required: false,
      },
      to: {
        type: String,
        required: false,
      },
      noOfCar: {
        type: Number,
        required: false,
      },
      checkInDate: {
        type: Date,
        required: false,
      },
      carType: {
        type: String,
        required: false,
      },
      driverPhoneNumber: {
        type: String,
        required: false,
      },
});

const customerTourSchema = new mongoose.Schema({
  tourConnectCustomer:{
    type: [tourArray]   
  },
  customer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking"
  }
});

export const CustomerTour = mongoose.model("CustomerTour", customerTourSchema);