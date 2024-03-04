import { asyncHandler } from "../utils/asyncHandler.js";
import { Booking } from "../models/booking.model.js";
import { Homestay } from "../models/homestay.model.js";
import { CustomerTour } from "../models/customerTour.model.js";

import moment from "moment";

const booking = asyncHandler(async (req, res, next) => {
  try {
    const {
      customerID,
      customerName,
      customerPhoneNumber,
      customerEmail,
      noOfAdults,
      noOfchilds1,
      noOfchilds2,
      totalAmount,
      paid,
      due,
      note,
      totalHomestayPriceB2B,
      advPaidB2B,
      guestRemainingBalance,
      dueB2B,
      tour,
      bookedBy
    } = req.body;

    // Iterate over each homestay in the tour
    for (const homestayBooking of tour) {
      const { homestayName, checkIn, checkOut, rooms } = homestayBooking;

      // Check if the homestay exists
      const homestay = await Homestay.findOne({ homestayName: homestayName });
      if (!homestay) {
        return res.status(404).json({
          message: `Homestay '${homestayName}' not found.`,
          status: false,
        });
      }

      // Check for existing bookings for the homestay and date range
      const existingBookingsOnDate = await Booking.find({
        homestayName,
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
        (acc, booking) => acc + booking.rooms,
        0
      );
      const availableRooms = totalRooms - bookedRooms;

      // If rooms are not available, return an error response
      if (availableRooms < rooms) {
        const nextAvailableDate = moment(checkOut).add(1, "day").toDate();
        return res.status(400).json({
          message: `No available rooms for '${homestayName}' on ${moment(
            checkIn
          ).format("MMMM Do YYYY")}. Next available date is ${moment(
            nextAvailableDate
          ).format("MMMM Do YYYY")}.`,
          status: false,
          nextAvailableDate,
        });
      }

      // TEST CODE ============

      homestay.rooms.push({
        customerName: customerName,
        checkIn: checkIn,
        checkOut: checkOut,
        rooms: rooms,
        booked: true,
      });

      // Save the updated homestay document
      await homestay.save();

      //TEST CODE =============
    }

    
    const createdBookings = await Booking.create(req.body);

    

    res.status(201).json({
      message: "Bookings created successfully.",
      status: true,
      bookings: createdBookings,
    });
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
    const { id } = req.params;
    const updatedData = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!updatedBooking) {
      console.log(updatedBooking);
      return res.status(404).send("Booking not found");
    }
    res.json(updatedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating customer");
  }
};

const getBookingById = async (req, res) => {
  const bookingId = req.params.id;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).send("Error retrieving customer");
  }
};

const addTour = async (req, res) => {
  try {
    const tour = new CustomerTour(req.body);
    const result = await tour.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(401).json({ message: "Could not add tour" });
    console.log(err);
  }
};

const deleteBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the booking exists
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // If the booking exists, delete it
    await Booking.findByIdAndDelete(id);

    // Return success response
    res.status(200).json({ message: "Booking deleted successfully." });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Error deleting booking." });
  }
});

export { booking, getAllBooking, updateBooking, addTour, getBookingById, deleteBooking };
