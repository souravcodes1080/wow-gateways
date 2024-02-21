import {Router} from "express"
import { booking, updateBooking } from "../controllers/booking.controller.js"
import { getAllBooking, addTour } from "../controllers/booking.controller.js"

const bookingRouter = Router()


bookingRouter.post("/booking", booking)
bookingRouter.get("/booking", getAllBooking)
bookingRouter.put("/:id", updateBooking)
bookingRouter.post("/tour", addTour)


export default bookingRouter