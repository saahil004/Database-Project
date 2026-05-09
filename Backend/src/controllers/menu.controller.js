import { asyncHandler } from "../utils/asynchandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


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

  console.log('Menu controller - localPath:', req.file?.path);
  const localPath = req.file?.path;
  let image_url = null;
  
  if (localPath) {
    console.log('Attempting Cloudinary upload...');
    const result = await uploadOnCloudinary(localPath);
    console.log('Cloudinary result:', result ? 'SUCCESS' : 'FAILED');
    if (!result) {
      return res.status(500).json({ success: false, message: "Cloudinary upload failed" });
    }
    image_url = result.secure_url;
    console.log('Image URL:', image_url);
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
  const db = req.app.locals.db;
  const user = req.user;

  if (user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin only' });
  }

  let menu_item_id = Number(req.params.menu_item_id);
  let { name, category_id, quantity, price } = req.body;

  console.log('Parsed menu_item_id:', menu_item_id, 'typeof:', typeof menu_item_id);

  quantity = Number(quantity);
  console.log('Parsed quantity:', quantity, 'typeof:', typeof quantity);

  if (!menu_item_id || (name === undefined && category_id === undefined && quantity === undefined && price === undefined)) {
    return res.status(400).json({ success: false, message: 'Menu ID and at least one field required' });
  }

  const updates = [];
  const params = [];

  if (name !== undefined) { updates.push('name = ?'); params.push(name); }
  if (category_id) { updates.push('category_id = ?'); params.push(category_id); }
  if (quantity !== undefined) { updates.push('quantity = ?'); params.push(quantity); }
  if (price !== undefined) { updates.push('price = ?'); params.push(price); }

  const localPath = req.file?.path;
  if (localPath) {
    const result = await uploadOnCloudinary(localPath);
    if (result) {
      updates.push('imageurl = ?');
      params.push(result.secure_url);
    }
  }

  console.log('Update debug - menu_item_id:', menu_item_id, 'type:', typeof menu_item_id, 'updates:', updates, 'params:', params, 'updateParams:', [menu_item_id, ...params]);
  
  // Test query first
  const [testRows] = await db.execute('SELECT * FROM menuitems WHERE menu_item_id = ?', [menu_item_id]);
  console.log('Test query rows for ID', menu_item_id, ':', testRows.length);
  
  // Fix params order: WHERE ? first
  const updateSql = `UPDATE menuitems SET ${updates.join(', ')} WHERE menu_item_id = ?`;
  const [resultDb] = await db.execute(updateSql, [...params, menu_item_id]);
  console.log('Update result affectedRows:', resultDb.affectedRows);

  if (resultDb.affectedRows === 0) {
    return res.status(404).json({ success: false, message: 'Menu item not found' });
  }

  res.status(200).json({
    success: true,
    message: 'Menu item updated successfully'
  });
});

export const deleteMenuItem = asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const user = req.user;

  if (user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin only' });
  }

  let menu_item_id = Number(req.params.menu_item_id);

  const sql = `DELETE FROM menuitems WHERE menu_item_id = ?`;
  const [resultDb] = await db.execute(sql, [menu_item_id]);

  if (resultDb.affectedRows === 0) {
    return res.status(404).json({ success: false, message: 'Menu item not found' });
  }

  res.status(200).json({
    success: true,
    message: 'Menu item deleted successfully'
  });
});
