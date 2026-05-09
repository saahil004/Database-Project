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

// Admin updates order status - triggers auto_assign_delivery when changed to 'preparing'
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const user = req.user;

  if (user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access only' });
  }

  const { orderId, status } = req.body;

  if (!orderId || !status) {
    return res.status(400).json({ success: false, message: 'orderId and status are required' });
  }

  // Get current status
  const [existingOrder] = await db.query(
    'SELECT status FROM orders WHERE order_id = ?',
    [orderId]
  );

  if (existingOrder.length === 0) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  const oldStatus = existingOrder[0].status;
  const newStatus = status;

  // Admin can ONLY confirm orders (move to 'preparing').
  // Delivery assignment is handled by DB trigger when status changes to 'preparing'.
  if (newStatus !== 'preparing') {
    return res.status(400).json({
      success: false,
      message: "Admin can only confirm orders (set status to 'preparing')"
    });
  }

  // Prevent re-confirming if already preparing/delivered
  if (oldStatus === 'preparing') {
    return res.status(400).json({
      success: false,
      message: "Order is already confirmed/preparing"
    });
  }

  const updateSql = `UPDATE orders SET status = ? WHERE order_id = ?`;
  await db.query(updateSql, [newStatus, orderId]);

  res.status(200).json({
    success: true,
    message: `Order status updated from '${oldStatus}' to '${newStatus}'`,
    data: { order_id: orderId, old_status: oldStatus, new_status: newStatus }
  });
});
