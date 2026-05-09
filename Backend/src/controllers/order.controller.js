import { asyncHandler } from '../utils/asynchandler.js';

export const createOrder = asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const user = req.user;

  if (user.role !== 'customer') {
    return res.status(403).json({
      success: false,
      message: 'Only customers can place orders'
    });
  }

  const { orderItems } = req.body;

  if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Order items required'
    });
  }

  await db.beginTransaction();

  try {
const orderSql = `INSERT INTO orders (customer_id, total_bill, status) VALUES (?, 0, 'pending')`;
    const [orderResult] = await db.query(orderSql, [user.customer_id]);
    const orderId = orderResult.insertId;

    for (const item of orderItems) {
      const { menu_item_id, quantity } = item;

      const stockSql = `SELECT quantity FROM menuitems WHERE menu_item_id = ?`;
      const [stockRows] = await db.query(stockSql, [menu_item_id]);
      if (stockRows.length === 0 || stockRows[0].quantity < quantity) {
        await db.rollback();
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for item ${menu_item_id}`
        });
      }

const orderItemSql = `INSERT INTO orderitems (order_id, menu_item_id, quantity) VALUES (?, ?, ?)`;
      await db.query(orderItemSql, [orderId, menu_item_id, quantity]);
      
      // Stock is automatically reduced by database trigger trg_reduce_stock_after_insert
    }

    // total_bill is now automatically calculated by database trigger trg_update_total
    await db.commit();

    // Fetch the calculated total from database
    const [orderRows] = await db.query(`SELECT total_bill FROM orders WHERE order_id = ?`, [orderId]);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: { order_id: orderId, total_bill: orderRows[0].total_bill }
    });

  } catch (error) {
    await db.rollback();
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Order placement failed'
    });
  }
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const user = req.user;

  const sql = `
    SELECT o.order_id, o.order_date, o.total_bill, o.status, 
           COUNT(oi.menu_item_id) as items_count
    FROM orders o
    LEFT JOIN orderitems oi ON o.order_id = oi.order_id
    WHERE o.customer_id = ?
    GROUP BY o.order_id
    ORDER BY o.order_date DESC
  `;

  const [orders] = await db.query(sql, [user.customer_id]);

  res.status(200).json({
    success: true,
    data: orders
  });
});

// Get all orders for delivery guy (only orders assigned to THIS rider)
export const getAllOrders = asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const user = req.user;
  
  console.log(`getAllOrders called for user:`, user);

  // Get orders assigned to this delivery guy that are NOT completed
  const sql = `
    SELECT o.order_id, o.order_date as created_at, o.total_bill as total_amount, o.status, 
           o.customer_id,
           c.name as customer_name, 
           c.address as delivery_address,
           c.contact as customer_contact
    FROM delivery d
    JOIN orders o ON d.order_id = o.order_id
    JOIN customers c ON o.customer_id = c.customer_id
    WHERE d.deliveryguy_id = ? AND d.deliverystatus != 'completed'
    ORDER BY o.order_date ASC
  `;

  const [orders] = await db.query(sql, [user.deliveryguy_id]);

  res.status(200).json({
    success: true,
    data: orders
  });
});

// Update order status (for delivery guy)
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const user = req.user;
  const { orderId } = req.params;
  const { status } = req.body;

  console.log(`updateOrderStatus called: role=${user?.role}, orderId=${orderId}, status=${status}`);

  if (!status) {
    return res.status(400).json({
      success: false,
      message: 'Status is required'
    });
  }

  // Check if order exists
  const [existingOrder] = await db.query(
    'SELECT order_id, status FROM orders WHERE order_id = ?',
    [orderId]
  );

  if (existingOrder.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  const currentStatus = existingOrder[0].status;

  // Delivery guy can ONLY mark delivered.
  if (user.role === 'deliveryguy') {
    if (status !== 'delivered' && status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: "Delivery guy can only mark the order as delivered/completed"
      });
    }

    // Ensure this order is assigned to THIS delivery guy and not already completed
    const [assignment] = await db.query(
      `SELECT delivery_id, deliverystatus
       FROM delivery
       WHERE order_id = ? AND deliveryguy_id = ?`,
      [orderId, user.deliveryguy_id]
    );

    if (!assignment || assignment.length === 0) {
      return res.status(403).json({
        success: false,
        message: 'This order is not assigned to you'
      });
    }

    if (assignment[0].deliverystatus === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Order already delivered'
      });
    }

    // Update orders.status to delivered (required by admin/customer UI)
    await db.query(
      'UPDATE orders SET status = ? WHERE order_id = ?',
      ['delivered', orderId]
    );

    // Update delivery table to completed + delivery_time
    await db.query(
      'UPDATE delivery SET deliverystatus = ?, delivery_time = NOW() WHERE order_id = ? AND deliveryguy_id = ?',
      ['completed', orderId, user.deliveryguy_id]
    );

    return res.status(200).json({
      success: true,
      message: `Order ${orderId} marked delivered`,
      data: { order_id: orderId, status: 'delivered' }
    });
  }

  // Admin should NOT be using this endpoint; reject explicitly.
  if (user.role === 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin cannot update order delivery status from this endpoint'
    });
  }

  // Any other role not allowed.
  return res.status(403).json({
    success: false,
    message: 'Not allowed'
  });
});


// Get completed deliveries for THIS delivery guy's history
export const getDeliveryHistory = asyncHandler(async (req, res) => {
  const db = req.app.locals.db;
  const user = req.user;

  // Get completed orders assigned to THIS delivery guy
  const sql = `
    SELECT o.order_id, o.order_date as delivery_time, o.total_bill as total_amount, 
           o.status, c.name as customer_name, c.address as delivery_address
    FROM delivery d
    JOIN orders o ON d.order_id = o.order_id
    JOIN customers c ON o.customer_id = c.customer_id
    WHERE d.deliveryguy_id = ? AND d.deliverystatus = 'completed'
    ORDER BY o.order_date DESC
  `;

  const [history] = await db.query(sql, [user.deliveryguy_id]);

  res.status(200).json({
    success: true,
    data: history
  });
});
