import { Router } from "express"
import { getAllOrders, registerCustomer } from '../controllers/admin.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router()

router.route("/orders").get(authMiddleware, getAllOrders)
router.route("/registercustomer").post(authMiddleware, registerCustomer)

export default router