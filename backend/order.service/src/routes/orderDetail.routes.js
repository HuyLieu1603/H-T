import { orderDetailController } from '../controllers/orderDetail.controller.js';
import { orderDetailMiddleware } from '../middlewares/orderDetail.middleware.js';
import { verifyToken } from '../../../product.service/src/middlewares/verify-token.middleware.js';
import { wrapRequestHandler } from '../../../product.service/src/utils/handle.util.js';
import express from 'express';

const router = express.Router();

//Create order detail
router.post(
  '/order-detail',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(orderDetailMiddleware),
  wrapRequestHandler(orderDetailController.createOrderDetail),
);

//Get order detail
router.get(
  '/order-detail',
  wrapRequestHandler(orderDetailController.getOrderDetailById),
);

export default router;
