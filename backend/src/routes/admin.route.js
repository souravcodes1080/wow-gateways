import {Router} from "express"
import { register } from "../controllers/admin.controller.js"
import { login } from "../controllers/admin.controller.js"
const adminRouter = Router()


adminRouter.post("/register", register)
adminRouter.post("/login", login)


export default adminRouter