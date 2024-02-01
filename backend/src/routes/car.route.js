import {Router} from "express"
import { addCar, getAllCar } from "../controllers/car.controller.js"
const carRouter = Router()

carRouter.post("/", addCar)
carRouter.get("/", getAllCar)


export default carRouter