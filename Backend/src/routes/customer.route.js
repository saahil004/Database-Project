import { Router } from "express";
import { registerCustomer } from "../controllers/customer.controller.js";

const router = Router();
router.post("/register", registerCustomer);

export default router;

