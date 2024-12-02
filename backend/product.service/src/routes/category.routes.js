import { categoryController } from '../controllers/category.controller.js';
import { categoryMiddleware } from '../middlewares/category.middleware.js';
import { wrapRequestHandler } from '../utils/handle.util.js';
import express from 'express';

const router = express.Router();

router.post(
  '/category',
  wrapRequestHandler(categoryMiddleware),
  wrapRequestHandler(categoryController.createCategory),
);

export default router;
