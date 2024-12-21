import express from 'express';
import { verifyToken } from '../middlewares/verify-token.middleware.js';
import {
  authorizeRole,
  checkPermission,
} from '../middlewares/check-permission.middleware.js';
import { wrapRequestHandler } from '../utils/handle-util.js';
import { warehouseController } from '../controllers/product.service/warehouse/warehouse.controller.js';

const router = express.Router();

router.post(
  '/warehouse',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(checkPermission),
  wrapRequestHandler(warehouseController.createWarehouse),
);

router.get(
  '/warehouses',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(checkPermission),
  wrapRequestHandler(warehouseController.fetchListWarehouse),
);

router.get(
  '/warehouse/:idWarehouse',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(checkPermission),
  wrapRequestHandler(warehouseController.getWarehouseById),
);

router.put(
  '/warehouse/:idWarehouse',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(checkPermission),
  wrapRequestHandler(warehouseController.updateWarehouse),
);

router.delete(
  '/warehouse/:idWarehouse',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(checkPermission),
  wrapRequestHandler(warehouseController.deleteWarehouse),
);

router.post(
  '/warehouse-category/:idWarehouse',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(checkPermission),
  wrapRequestHandler(warehouseController.addCategoryToWarehouse),
);

export default router;
