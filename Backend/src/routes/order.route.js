import { Router } from 'express';
import { createOrder, getMyOrders } from '../controllers/order.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const orderRouter = Router();

orderRouter.post('/placeOrder', authMiddleware, createOrder);
orderRouter.get('/myorders', authMiddleware, getMyOrders);

export default orderRouter;
