import { verifyToken } from '../middlewares/verify-token.middleware.js';
import { shopController } from '../controllers/shop.controller.js';
import express from 'express';
import { wrapRequestHandler } from '../utils/handle.util.js';
import { checkPermission } from '../middlewares/check-permission.middleware.js';
import { shopMiddleware } from '../middlewares/shop.middleware.js';

const router = express.Router();

router.post(
  '/shop',
  wrapRequestHandler(shopMiddleware),
  wrapRequestHandler(shopController.createShop),
);

router.get('/shop/:idShop', wrapRequestHandler(shopController.getShopById));

//fetch list shop
router.get('/list-shop', wrapRequestHandler(shopController.fetchListShop));

//update shop by id
router.put('/shop/:idShop', wrapRequestHandler(shopController.updateShopById));

//update status shop by id
router.put(
  '/shop-status/:idShop',
  wrapRequestHandler(shopController.updateStatusShop),
);

//delete shop
router.delete(
  '/shop/:idShop',
  wrapRequestHandler(shopController.deleteShopById),
);
export default router;
