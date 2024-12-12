import { cartController } from '../controllers/cart.controller.js';
import { cartMiddleware } from '../middlewares/cart.middleware.js';
import { wrapRequestHandler } from '../utils/handle.util.js';
import express from 'express';

const router = express.Router();
// creater cart
router.post(
  '/cart',
  wrapRequestHandler(cartMiddleware),
  wrapRequestHandler(cartController.createCart),
);
// add product for cart
router.post('/cart/add', wrapRequestHandler(cartController.addProductToCart));
// update quantity
router.put(
  '/cart/update-quantity',
  wrapRequestHandler(cartController.updateProductQuantityInCart),
);

export default router;
