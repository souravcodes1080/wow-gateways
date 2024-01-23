import {Router} from "express"
import { booking } from "../controllers/booking.controller.js"
const bookingRouter = Router()


bookingRouter.post("/booking", booking)


export default bookingRouter