import express from 'express';
import { verifyToken } from '../middlewares/verify-token.middleware.js';
import {
  authorizeRole,
  checkPermission,
} from '../middlewares/check-permission.middleware.js';
import { wrapRequestHandler } from '../utils/handle-util.js';
import { categoryController } from '../controllers/product.service/category/category.controller.js';

const router = express.Router();

router.get(
  '/category',
  wrapRequestHandler(categoryController.fetchListCategory),
);

router.get(
  '/category/:idCategory',
  wrapRequestHandler(categoryController.getCategoryById),
);

router.post(
  '/category',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(checkPermission),
  wrapRequestHandler(categoryController.createCategory),
);

router.put(
  '/category/:idCategory',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(checkPermission),
  wrapRequestHandler(categoryController.updateCategoryById),
);

router.delete(
  '/category/:idCategory',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(checkPermission),
  wrapRequestHandler(categoryController.deleteCategory),
);

export default router;
