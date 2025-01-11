import express from 'express';
import { verifyToken } from '../middlewares/verify-token.middleware.js';
import {
  authorizeRole,
  checkPermission,
} from '../middlewares/check-permission.middleware.js';
import { wrapRequestHandler } from '../utils/handle-util.js';
import { productController } from '../controllers/product.service/product/product.controller.js';

const router = express.Router();

router.post(
  '/product/create',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(productController.createNewproduct),
);
router.get(
  '/product/:idProduct',
  wrapRequestHandler(productController.getProductById),
);
router.get(
  '/listProduct',
  wrapRequestHandler(productController.fetchListProduct),
);
router.put(
  '/product/:idProduct',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(productController.updateProductById),
);
router.delete(
  '/product/:idProduct',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(productController.deleteProduct),
);

export default router;
