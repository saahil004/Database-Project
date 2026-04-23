import { asyncHandler } from "../utils/asynchandler.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";


export const getMenu = asyncHandler(async (req, res) => {
    const db = req.app.locals.db
    const sql = `
        SELECT 
    m.menu_item_id,
    m.name,
    m.price,
    m.quantity,
    m.imageurl AS image_url,
    c.name AS category_name
FROM menuitems m
JOIN categories c ON m.category_id = c.category_id;
    `;

    const [rows] = await db.query(sql);
    res.status(200).json({
        success: true,
        data: rows,
        message: "Menu fetched successfully"
    });
});
export const getMenuItem = asyncHandler(async (req, res) => {

});
export const createMenuItem = asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const user = req.user;

  if (user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin only' });
  }

  const { name, category_id, quantity, price } = req.body;
  
  if (!name || !category_id || quantity == null || !price) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const localPath = req.file?.path;
  let image_url = null;
  
  if (localPath) {
    const result = await uploadOnCloudinary(localPath);
    if (!result) {
      return res.status(500).json({ success: false, message: "Cloudinary upload failed" });
    }
    image_url = result.url;
  }
  
  const sql = `INSERT INTO menuitems (name, category_id, quantity, price, imageurl) VALUES (?, ?, ?, ?, ?)`;
  const [resultDb] = await db.execute(sql, [name, category_id, quantity, price, image_url]);
  
  res.status(201).json({
    success: true,
    message: "Menu item created successfully",
    data: { menu_item_id: resultDb.insertId }
  });
});
export const updateMenuItem = asyncHandler(async (req, res) => {

});
export const deleteMenuItem = asyncHandler(async (req, res) => {

});