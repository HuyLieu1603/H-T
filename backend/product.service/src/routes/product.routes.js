import { productController } from '../controllers/product.controller.js';
import { productMiddleware } from '../middlewares/product.middleware.js';
import { wrapRequestHandler } from '../utils/handle.util.js';
import express from 'express';

const router = express.Router();
router.post(
  '/product',
  wrapRequestHandler(productMiddleware),
  wrapRequestHandler(productController.createProduct),
);

export default router;
