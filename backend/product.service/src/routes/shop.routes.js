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

router.get('/shop', wrapRequestHandler(shopController.getShopById));
