import { categoryController } from '../controllers/category.controller.js';
import { categoryMiddleware } from '../middlewares/category.middleware.js';
import { wrapRequestHandler } from '../utils/handle.util.js';
import express from 'express';

const router = express.Router();
// POST : create new category
router.post(
  '/category',
  wrapRequestHandler(categoryMiddleware),
  wrapRequestHandler(categoryController.createCategory),
);
// GET : get detail category by id
router.get(
  '/category/:idCategory',
  wrapRequestHandler(categoryController.getCategoryById),
);
// GET : fetch list category
router.get(
  '/categorys',
  wrapRequestHandler(categoryController.fetchListCategory),
);
//PUT: update category
router.put(
  '/category/:idCategory',
  wrapRequestHandler(categoryMiddleware),
  wrapRequestHandler(categoryController.fetchListCategory),
);
//DELETE: delete category
router.delete(
  '/category/:idCategory',
  wrapRequestHandler(categoryController.deleteCategory),
);
export default router;
