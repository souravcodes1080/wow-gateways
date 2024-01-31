import {Router} from "express"
import { booking } from "../controllers/booking.controller.js"
import { getAllBooking } from "../controllers/booking.controller.js"
const bookingRouter = Router()


bookingRouter.post("/booking", booking)
bookingRouter.get("/booking", getAllBooking)


export default bookingRouter