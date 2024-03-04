import mongoose from "mongoose";

const roomStatusSchema = new mongoose.Schema({
    customerName: {
        type: String,
            },
    checkIn: {
        type: Date,
    },
    checkOut: {
        type: Date,
    },
    rooms: {
        type: Number,
    },
    booked: {
        type: Boolean,
        default: false,
    },
});


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
    price: {
        type: Number,
    },
    b2b: {
        type: Number,
    },
    address: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false
    },
    features: {
        type: [],
    },
    noOfrooms: {
        type: Number,
        required: true,
        default: 1,
    },
    noOfCars: {
        type: Number,
        required: true,
        default: 1
    },
    images: {
        type: [],
        required: true,
    },
    balconyImage: {
        type: [],
    },
    viewImage: {
        type: [],

    },
    roomImage: {
        type: [],

    },
    googleMapLink: {
        type: String,
    },
    review: {
        type: [],
    },
    package: {
        type: []
    },
    rooms: {
        type: [[roomStatusSchema]],
        required: true,
        default: [[]],
    },

});



export const Homestay = mongoose.model("Homestay", homestaySchema);
