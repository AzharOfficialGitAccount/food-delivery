import express from 'express';
import * as ordertController from '../../../controller/order/order';
import * as schema from '../../../validation/common';
import { reqValidator } from '../../../middleware/requestValidator';
import { verifyAuthToken } from '../../../middleware/auth';

const router = express.Router();

router.post('/orders', reqValidator(schema.order), verifyAuthToken, ordertController.order);
router.put('/order-status', reqValidator(schema.orderStatus), verifyAuthToken, ordertController.updateOrderStatus);
router.get('/track-orders', verifyAuthToken, ordertController.trackOrderStatus);
router.get('/get-orders', verifyAuthToken, ordertController.getOrders);
router.put('/notify-orders-status', reqValidator(schema.orderStatus), verifyAuthToken, ordertController.notifyOrderStatus);

export default router;
