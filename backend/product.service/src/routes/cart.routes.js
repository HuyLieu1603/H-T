import { cartController } from '../controllers/cart.controller.js';
import { cartMiddleware } from '../middlewares/cart.middleware.js';
import { wrapRequestHandler } from '../utils/handle.util.js';
import express from 'express';

const router = express.Router();
router.post(
  '/cart',
  wrapRequestHandler(cartMiddleware),
  wrapRequestHandler(cartController.createCart),
);

router.post('/cart/add', wrapRequestHandler(cartController.addProductToCart));

export default router;
