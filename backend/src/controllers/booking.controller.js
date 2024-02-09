import { asyncHandler } from "../utils/asyncHandler.js";
import { Booking } from "../models/booking.model.js";
import { Homestay } from "../models/homestay.model.js";
import { CustomerTour } from '../models/customerTour.model.js';

import moment from "moment";

const booking = asyncHandler(async (req, res, next) => {
  try {
    const {
      customerName,
      customerPhoneNumber,
      customerEmail,
      checkIn,
      checkOut,
      noOfAdults,
      noOfchilds1,
      noOfchilds2,
      homestayName,
      noOfRoomsBooked,
      totalAmount,
      paid,
      due,
      note,
      cars,
      tourPackage,
      totalHomestayPriceB2B,
      advPaidB2B,
        guestRemainingBalance,
        dueB2B
    } = req.body;

    const homestay = await Homestay.findOne({ homestayName: homestayName });

    if (!homestay) {
      return res.status(404).json({
        message: "Homestay not found.",
        status: false,
      });
    }

    const existingBookingsOnDate = await Booking.find({
      homestayName: homestayName,
      $or: [
        {
          $and: [
            { checkIn: { $lte: checkIn } },
            { checkOut: { $gte: checkIn } },
          ],
        },
        {
          $and: [
            { checkIn: { $lte: checkOut } },
            { checkOut: { $gte: checkOut } },
          ],
        },
      ],
    });

    const totalRooms = homestay.noOfrooms;
    const bookedRooms = existingBookingsOnDate.reduce(
      (acc, booking) => acc + booking.noOfRoomsBooked,
      0
    );
    const availableRooms = totalRooms - bookedRooms;

    console.log("Available Rooms:", availableRooms);

    if (availableRooms >= noOfRoomsBooked) {
      const booking = await Booking.create({
        customerName,
        customerPhoneNumber,
        customerEmail,
        noOfAdults,
        noOfchilds1,
        noOfchilds2,
        checkIn,
        checkOut,
        homestayName: homestayName,
        noOfRoomsBooked,
        cars,
        totalAmount,
        paid,
        due,
        note,
        tourPackage,
        totalHomestayPriceB2B,
        advPaidB2B,
        guestRemainingBalance,
        dueB2B
      });

      return res.status(201).json({
        message: "Booking created successfully.",
        status: true,
        booking,
      });
    } else {
      const nextAvailableDate = moment(checkOut).add(1, "day").toDate();

      return res.status(400).json({
        message: `No available rooms on ${moment(checkIn).format(
          "MMMM Do YYYY"
        )}. Next available date is ${moment(nextAvailableDate).format(
          "MMMM Do YYYY"
        )}.`,
        status: false,
        nextAvailableDate,
      });
    }
  } catch (error) {
    next(error);
  }
});
const getAllBooking = asyncHandler(async (req, res, next) => {
  try {
    
    const bookings = await Booking.find();

    
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({
        message: "No bookings found.",
        status: false,
      });
    }

    
    return res.status(200).json({
      message: "Bookings fetched successfully.",
      status: true,
      bookings,
    });
  } catch (error) {
    
    next(error);
  }
});
const updateBooking = async (req, res) => {
  try {
    const { id } = req.params
    const updatedData = req.body; 
    const updatedBooking = await Booking.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
    if (!updatedBooking) {
      console.log(updatedBooking)
      return res.status(404).send('Booking not found');
    }
    res.json(updatedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating customer');
  }
}

const addTour = async (req, res) => {
  try {
    const tour = new CustomerTour(req.body);
    const result = await tour.save();
    res.status(201).json(result);
  } catch(err) {
    res.status(401).json({"message":"Could not add tour"});
    console.log(err);
  }
}


export { booking, getAllBooking, updateBooking, addTour };
  