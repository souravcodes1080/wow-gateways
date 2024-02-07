import {Router} from "express"
import { addLocation, getAllLocations, updateLocation } from "../controllers/location.controller.js"
const locationRouter = Router()

locationRouter.post("/", addLocation)
locationRouter.get("/", getAllLocations)
locationRouter.put("/:locationId", updateLocation)


export default locationRouter