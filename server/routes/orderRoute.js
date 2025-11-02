import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, usersOrders, verifyRazorPay, verifyStripe } from '../controllers/orderController.js';
import authUser from '../middleware/auth.js';


const orderRouter = express.Router();

orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

//Payment
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

// user features
orderRouter.post('/userorders', authUser, usersOrders);

// verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)
orderRouter.post('/verifyRazorpay', authUser, verifyRazorPay)

export default orderRouter;
