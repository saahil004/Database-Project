import express from "express";
import { getCategories } from "../controllers/category.controller.js";

const categoryRouter = express.Router();

// GET all categories
categoryRouter.get("/getCategories", getCategories);

// CREATE a new category
// router.post("/createCategory", createCategory);

export default categoryRouter;