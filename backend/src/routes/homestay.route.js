import {Router} from "express"
import { add } from "../controllers/homestay.controller.js"
import { getAll } from "../controllers/homestay.controller.js"
const homestayRouter = Router()


homestayRouter.post("/add", add)
homestayRouter.get("/getall", getAll)


export default homestayRouter