import { Router } from 'express';
import { createOrder, getMyOrders, getAllOrders, updateOrderStatus, getDeliveryHistory } from '../controllers/order.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const orderRouter = Router();

orderRouter.post('/placeOrder', authMiddleware, createOrder);
orderRouter.get('/myorders', authMiddleware, getMyOrders);

// Delivery guy routes
orderRouter.get('/getallorders', authMiddleware, getAllOrders);
orderRouter.put('/update/:orderId', authMiddleware, updateOrderStatus);
orderRouter.get('/history', authMiddleware, getDeliveryHistory);

export default orderRouter;
