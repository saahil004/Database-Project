import { Router } from "express";
import { getMenu, createMenuItem } from "../controllers/menu.controller.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
import multer from 'multer';

const menuRouter = Router();

const upload = multer({ dest: 'Backend/public/uploads/' });

menuRouter.route("/getMenu").get(getMenu);
menuRouter.route("/addmenuitem").post(adminAuth, upload.single('image'), createMenuItem);

export default menuRouter;
