import { cartController } from '../controllers/cart.controller.js';
import { cartMiddleware } from '../middlewares/cart.middleware.js';
import { wrapRequestHandler } from '../utils/handle.util.js';
import { verifyToken } from '../middlewares/verify-token.middleware.js';
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
router.post(
  '/cart/delete/:idCart',
  wrapRequestHandler(cartController.deleteProductInCart),
);
router.post(
  '/cart/increasequantity',
  wrapRequestHandler(cartController.increaseQuantityItem),
);
router.post(
  '/cart/decreasequantity',
  wrapRequestHandler(cartController.decreaseQuantityItem),
);
router.post(
  '/cart/cartCreateNew',
  wrapRequestHandler(cartController.createNewCart),
);

export default router;  
