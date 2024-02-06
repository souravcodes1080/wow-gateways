import {Router} from "express"
import { addCar, getAllCar, updateCar } from "../controllers/car.controller.js"
const carRouter = Router()

carRouter.post("/", addCar)
carRouter.get("/", getAllCar)
carRouter.put("/:carId", updateCar)


export default carRouter