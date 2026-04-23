import { asyncHandler } from '../utils/asynchandler.js';

export const getAllOrders = asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const user = req.user;

  if (user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access only' });
  }

  const sql = `
    SELECT o.*, c.name as customer_name, c.contact as customer_contact
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    ORDER BY o.order_date DESC
  `;

  const [orders] = await db.query(sql);

  res.status(200).json({
    success: true,
    data: orders,
    message: 'Orders fetched successfully'
  });
});

export const registerCustomer = asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const user = req.user;

  if (user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access only' });
  }

  const { name, address, username, email, password, contact } = req.body;

  const sql = `INSERT INTO customers (name, address, username, email, password, contact) VALUES (?, ?, ?, ?, ?, ?)`;

  const [result] = await db.query(sql, [name, address, username, email, password, contact]);

  res.status(201).json({
    success: true,
    data: {
      customer_id: result.insertId,
      name,
      username
    },
    message: 'Customer registered successfully'
  });
});
