import { asyncHandler } from "../utils/asyncHandler.js";
import { Booking } from "../models/booking.model.js";
import { Homestay } from "../models/homestay.model.js";

import moment from "moment";

const booking = asyncHandler(async (req, res, next) => {
    try {
        const {
            name,
            phoneNumber,
            email,
            familyMembers,
            checkInDate,
            checkOutDate,
            homestayName,
            rooms,
            car,
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
                { $and: [{ checkInDate: { $lte: checkInDate } }, { checkOutDate: { $gte: checkInDate } }] },
                { $and: [{ checkInDate: { $lte: checkOutDate } }, { checkOutDate: { $gte: checkOutDate } }] },
            ],
        });

        const totalRooms = homestay.noOfrooms;
        const bookedRooms = existingBookingsOnDate.reduce((acc, booking) => acc + booking.rooms, 0);
        const availableRooms = totalRooms - bookedRooms;

        console.log("Available Rooms:", availableRooms);

        if (availableRooms >= rooms) {
            
            const booking = await Booking.create({
                name,
                phoneNumber,
                email,
                familyMembers,
                checkInDate,
                checkOutDate,
                homestayName: homestayName,
                rooms,
                car,
            });

            return res.status(201).json({
                message: "Booking created successfully.",
                status: true,
                booking,
            });
        } else {
            const nextAvailableDate = moment(checkOutDate).add(1, 'day').toDate();

            return res.status(400).json({
                message: `No available rooms on ${moment(checkInDate).format('MMMM Do YYYY')}. Next available date is ${moment(nextAvailableDate).format('MMMM Do YYYY')}.`,
                status: false,
                nextAvailableDate,
            });
        }

    } catch (error) {
        next(error);
    }
});

export { booking };
