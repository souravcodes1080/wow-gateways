import {Router} from "express"
import { booking, deleteBooking, getBookingById, updateBooking } from "../controllers/booking.controller.js"
import { getAllBooking, addTour  } from "../controllers/booking.controller.js"

const bookingRouter = Router()


bookingRouter.post("/booking", booking)
bookingRouter.get("/booking", getAllBooking)
bookingRouter.get("/booking/:id", getBookingById)
bookingRouter.put("/:id", updateBooking)
bookingRouter.post("/tour", addTour)
bookingRouter.delete("/:id", deleteBooking)

export default bookingRouter