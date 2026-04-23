import { asyncHandler } from '../utils/asynchandler.js';

export const registerCustomer = asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const { name, address, username, email, password, contact } = req.body;

  // Check if customer exists
  const checkSql = `SELECT customer_id FROM customers WHERE username = ? OR email = ?`;
  const [existing] = await db.query(checkSql, [username, email]);
  if (existing.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Username or email already exists'
    });
  }

  const sql = `
    INSERT INTO customers (name, address, username, email, password, contact)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const [result] = await db.query(sql, [name, address, username, email, password, contact]);

  res.status(201).json({
    success: true,
    data: {
      customer_id: result.insertId,
      name,
      username,
      email,
      message: 'Customer registered successfully'
    }
  });
});
