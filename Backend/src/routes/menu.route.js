import { Router } from "express";
import { getMenu, createMenuItem, updateMenuItem, deleteMenuItem } from "../controllers/menu.controller.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
import { upload } from "../../middlewares/multer.js";

const menuRouter = Router();

menuRouter.route("/getMenu").get(getMenu);
menuRouter.route("/addmenuitem").post(adminAuth, upload.single('image'), createMenuItem);
menuRouter.route("/updatemenuitem/:menu_item_id").put(adminAuth, upload.single('image'), updateMenuItem);
menuRouter.route("/deletemenuitem/:menu_item_id").delete(adminAuth, deleteMenuItem);

export default menuRouter;

