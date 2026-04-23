import { Router } from "express";
import { authAdmin, authCustomer, authDeliveryGuy } from "../controllers/auth.controller.js";


const authRouter = Router()
authRouter.post("/logincustomer", authCustomer)
authRouter.post("/loginadmin", authAdmin)
authRouter.post("/logindeliveryguy", authDeliveryGuy)

export default authRouter