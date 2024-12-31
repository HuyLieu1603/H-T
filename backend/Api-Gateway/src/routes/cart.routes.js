import express from 'express';
import { verifyToken } from '../middlewares/verify-token.middleware.js';
import {
  authorizeRole,
  checkPermission,
} from '../middlewares/check-permission.middleware.js';
import { wrapRequestHandler } from '../utils/handle-util.js';
import { cartController } from '../controllers/product.service/cart/cart.controller.js';

const router = express.Router();

router.post(
  '/cart/add/:id_user',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(cartController.addProductToCart),
);
router.post(
  '/cart/cartCreateNew',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(cartController.createNewCart),
);
router.post(
  '/cart/add',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(cartController.addProductToCart),
);
export default router;
