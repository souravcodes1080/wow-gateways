import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
    },
    customerPhoneNumber: {
        type: Number,
        required: true,
    },
    customerEmail: {
        type: String,
    },
    checkIn: {
        type: Date,
        required: true,
    },
    checkOut: {
        type: Date,
    },
    homestayName: {
        type: String,
        required: true,
    },
    noOfAdults:{
        type: Number,
        default: 1
    },
    noOfchilds1: {
        type: Number,
        default: 0,
    },  
    noOfchilds2:{
        type: Number,
        default: 0
    },
    noOfRoomsBooked: {
        type: Number,
        default: 1
    },
    totalAmount: {
        type: Number,
    },
    paid: {
        type: Number,
    },
    due: {
        type: Number,
    },
    note: {
        type: String,
    },
    cars: { 
        type: String,
    },
    tourPackage: { 
        type: String,
    },
    bookedOn:{
        type: Date,
        default: Date.now,
    }
});



export const Booking = mongoose.model("Booking", bookingSchema);
