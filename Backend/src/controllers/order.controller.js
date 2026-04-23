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

    let calculatedTotal = 0;

    for (const item of orderItems) {
      const { menu_item_id, quantity } = item;

      const stockSql = `SELECT quantity, price FROM menuitems WHERE menu_item_id = ?`;
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

      const updateStockSql = `UPDATE menuitems SET quantity = quantity - ? WHERE menu_item_id = ?`;
      await db.query(updateStockSql, [quantity, menu_item_id]);

      calculatedTotal += stockRows[0].price * quantity;
    }

    await db.query(`UPDATE orders SET total_bill = ? WHERE order_id = ?`, [calculatedTotal, orderId]);
    await db.commit();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: { order_id: orderId, total_bill: calculatedTotal }
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
