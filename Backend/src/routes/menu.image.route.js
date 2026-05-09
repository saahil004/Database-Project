import express from "express";
import { upload } from "../../middlewares/multer.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const router = express.Router();

router.post("/menu", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const result = await uploadOnCloudinary(req.file.path);

    if (!result) {
      return res.status(500).json({ message: "Cloudinary upload failed" });
    }

    const imageUrl = result.secure_url;

    const db = req.app.locals.db;

    // Keep DB columns consistent with menuitems table used by getMenu (menu.controller.js)
    // menuitems(imageurl) is what the menu list endpoint selects as image_url.
    await db.query(
      "INSERT INTO menuitems (name, price, quantity, category_id, imageurl) VALUES (?, ?, ?, ?, ?)",
      [req.body.name, req.body.price, req.body.quantity ?? 0, req.body.category_id, imageUrl]
    );


    res.json({
      success: true,
      image: imageUrl,
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;