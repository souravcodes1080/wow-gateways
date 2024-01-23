import mongoose from "mongoose";


const homestaySchema = new mongoose.Schema({
    homestayName: {
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
    address:{
        type: String,
        required: true
    },
    noOfrooms:{
        type: Number,
        required: true,
        default: 1,
    },
    noOfCars: {
        type: Number,
        required: true,
        default: 1
    },
});



export const Homestay = mongoose.model("Homestay", homestaySchema);
