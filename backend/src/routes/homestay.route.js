import {Router} from "express"
import { addHomestay } from "../controllers/homestay.controller.js"
import { getAllHomestay } from "../controllers/homestay.controller.js"
import { updateHomestay } from "../controllers/homestay.controller.js"
import { deleteHomestay } from "../controllers/homestay.controller.js"
import { getAllHomestayName } from "../controllers/homestay.controller.js"
const homestayRouter = Router()


homestayRouter.post("/addhomestay", addHomestay)
homestayRouter.get("/", getAllHomestay)
homestayRouter.get("/homestayName", getAllHomestayName)
homestayRouter.put("/:id", updateHomestay)
homestayRouter.delete("/:id", deleteHomestay)

export default homestayRouter