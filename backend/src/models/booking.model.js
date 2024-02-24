import mongoose from "mongoose";
const { Schema } = mongoose;
const tourSchema = new mongoose.Schema({
    homestayName: {
        type:String
    },
    checkIn: {
        type: Date,
    },
    checkOut: {
        type: Date,
    },
    price: {
        type: Number,
    },
    car: {
        type: String,
    },
    carCost: {
        type: Number,
    },
    rooms: {
        type: Number,
    }
})

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
    noOfAdults: {
        type: Number,
        required: true,
        default: 1
    },
    noOfchilds1: {
        type: Number,
        default: 0,
    },
    noOfchilds2: {
        type: Number,
        default: 0
    },
    totalHomestayPriceC: {
        type: Number,
    },
    paid: {
        type: Number,
        required: true,
    },
    due: {
        type: Number,
    },
    note: {
        type: String,
    },
    bookedOn: {
        type: Date,
        default: Date.now,
    },
    totalHomestayPriceB2B: {
        type: Number,
    },
    advPaidB2B: {
        type: Number,
    },
    guestRemainingBalance: {
        type: Number,
    },
    dueB2B: {
        type: Number
    },
    tour: {
        type: [tourSchema],
        // default: () => {
        //     return Array.from({ length: 5 }, () => {
        //         return new tourSchema();
        //     });
        // },
    }
});



export const Booking = mongoose.model("Booking", bookingSchema);

