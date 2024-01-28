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
    price:{
        type: Number,
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
    images:{
        type: [],
        required: true,
    },
    balconyImage:{
        type: [],
       
    },
    viewImage:{
        type: [],
        
    },
    roomImage:{
        type: String,
      
    },
    googleMapLink:{
        type: String,
    },
    review:{
        type: [],
    },
    package:{
        type:[]
    }

});



export const Homestay = mongoose.model("Homestay", homestaySchema);
