import express from 'express';
import { verifyToken } from '../middlewares/verify-token.middleware.js';
import {
  authorizeRole,
  checkPermission,
} from '../middlewares/check-permission.middleware.js';
import { wrapRequestHandler } from '../utils/handle-util.js';
import { productController } from '../controllers/product.service/product/product.controller.js';

const router = express.Router();
//Create product
router.post(
  '/product/create',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(productController.createNewProduct),
);
//GET: product by id
router.get(
  '/product/:idProduct',
  wrapRequestHandler(productController.getProductById),
);
//GET: List product 
router.get(
  '/listProduct',
  wrapRequestHandler(productController.fetchListProduct),
);
//GET: list product by shop

//GET: list product 
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
