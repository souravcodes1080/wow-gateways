import mongoose from "mongoose";
<<<<<<< HEAD
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
        default: () => {
            return Array.from({ length: 5 }, () => {
                return new tourSchema();
            });
        },
    }
=======

const tourPackageSchema = new mongoose.Schema({
  from: { type: String },
  to: { type: String },
  homestayName: { type: String },
  noOFCar: { type: Number },
  carType: { type: String },
  driverNumber: { type: Number },
  price: { type: Number, required: true },
});

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
  noOfAdults: {
    type: Number,
    default: 1,
  },
  noOfchilds1: {
    type: Number,
    default: 0,
  },
  noOfchilds2: {
    type: Number,
    default: 0,
  },
  noOfRoomsBooked: {
    type: Number,
    default: 1,
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
    type: Number,
  },
//   tourPackages: {
//     type: [tourPackageSchema],
//     default: [null, null, null, null, null],
//   },
>>>>>>> 0065dc8bf2c27bac9b4a9e5e7908ad17f92c4d2e
});

export const Booking = mongoose.model("Booking", bookingSchema);


















// import mongoose from "mongoose";

// const tourPackageSchema = new mongoose.Schema({
//     from: { type: String },
//     to: { type: String },
//     homestayName: {type: String},
//     noOFCar: { type: Number},
//     carType: {type: String},
//     driverNumber: {type: Number},
//     price: { type: Number, required: true}
// });


// const bookingSchema = new mongoose.Schema({
//     customerName: {
//         type: String,
//         required: true,
//     },
//     customerPhoneNumber: {
//         type: Number,
//         required: true,
//     },
//     customerEmail: {
//         type: String,
//     },
//     checkIn: {
//         type: Date,
//         required: true,
//     },
//     checkOut: {
//         type: Date,
//     },
//     homestayName: {
//         type: String,
//         required: true,
//     },
//     noOfAdults:{
//         type: Number,
//         default: 1
//     },
//     noOfchilds1: {
//         type: Number,
//         default: 0,
//     },  
//     noOfchilds2:{
//         type: Number,
//         default: 0
//     },
//     noOfRoomsBooked: {
//         type: Number,
//         default: 1
//     },
//     totalAmount: {
//         type: Number,
//     },
//     paid: {
//         type: Number,
//     },
//     due: {
//         type: Number,
//     },
//     note: {
//         type: String,
//     },
//     cars: { 
//         type: String,
//     },
//     tourPackage: { 
//         type: String,
//     },
//     bookedOn:{
//         type: Date,
//         default: Date.now,
//     },
//     totalHomestayPriceB2B: {
//         type: Number,
//     },
//     advPaidB2B:{
//         type: Number,
//     },
//     guestRemainingBalance:{
//         type: Number,
//     },
//     dueB2B:{
//         type: Number
//     },
//     tourPackages: { type: [tourPackageSchema], default: [null, null, null, null, null] }

// });



// export const Booking = mongoose.model("Booking", bookingSchema);
