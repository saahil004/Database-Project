import { asyncHandler } from "../utils/asynchandler.js";

// GET ALL CATEGORIES
export const getCategories = asyncHandler(async (req, res) => {
    const db = req.app.locals.db;

    const sql = `
        SELECT * FROM categories;
    `;

    const [rows] = await db.query(sql);

    return res.status(200).json({
        success: true,
        data: rows,
        message: "Categories fetched successfully"
    });
});