import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
    },
    familyMembers: {
        type: Number,
        required: true,
        default: 1,
    },
    checkInDate: {
        type: Date,
        required: true,
    },
    checkOutDate: {
        type: Date,
    },
    numberOfDays: {
        type: Number,
    },
    homestayName: {
        type: String,
        required: true,
    },
    rooms: {
        type: Number,
    },
    car: { 
        type: String,
        default: false,
    },
    bookedOn:{
        type: Date,
        default: Date.now,
    },
    extra:{
        type: String,
        required: false
    }
});



export const Booking = mongoose.model("Booking", bookingSchema);
