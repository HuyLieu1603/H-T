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
// GET : get detail product by id
router.get(
  '/product/:idProduct',
  wrapRequestHandler(productController.getProductById),
);
// GET : fetch list product
router.get(
  '/list-product',
  wrapRequestHandler(productController.fetchListProduct),
);
//PUT: update product
router.put(
  '/product/:idProduct',
  wrapRequestHandler(productMiddleware),
  wrapRequestHandler(productController.updateProduct),
);
//DELETE: delete product
router.delete(
  '/product/:idProduct',
  wrapRequestHandler(productController.deleteProduct),
);
//Get : fetcg list product by idCategory
router.get(
  '/product/:idcategory',
  wrapRequestHandler(productController.getProductByIdCategory),
);

export default router;
