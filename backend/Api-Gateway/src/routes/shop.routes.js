import express from 'express';
import { verifyToken } from '../middlewares/verify-token.middleware.js';
import {
  authorizeRole,
  checkPermission,
} from '../middlewares/check-permission.middleware.js';
import { wrapRequestHandler } from '../utils/handle-util.js';
import { shopController } from '../controllers/product.service/shop/shop.controller.js';

const router = express.Router();

//get shop by id
router.get('/shop/:idShop', wrapRequestHandler(shopController.getShopById));

//Create shop
router.post(
  '/shop',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(checkPermission),
  wrapRequestHandler(shopController.createShop),
);

//fetch list shop
router.get('/list-shop', wrapRequestHandler(shopController.fetchListShop));

// update shop by id
router.put(
  '/shop/:idShop',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(checkPermission),
  wrapRequestHandler(shopController.updateShopById),
);

// update status by id
router.put(
  '/shop-status/:idShop',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(checkPermission),
  wrapRequestHandler(shopController.updateStatusShop),
);

export default router;
