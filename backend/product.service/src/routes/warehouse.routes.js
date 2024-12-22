import { checkPermission } from '../middlewares/check-permission.middleware.js';
import { warehouseController } from '../controllers/warehouse.controller.js';
import {
  addCategoryMiddleware,
  warehouseMiddleware,
} from '../middlewares/warehouse.middleware.js';
import { verifyToken } from '../middlewares/verify-token.middleware.js';
import { wrapRequestHandler } from '../utils/handle.util.js';
import express from 'express';

const router = express.Router();

//create new warehouse
router.post(
  '/warehouse',
  // wrapRequestHandler(verifyToken),
  // wrapRequestHandler(checkPermission),
  wrapRequestHandler(warehouseMiddleware),
  wrapRequestHandler(warehouseController.createWarehouse),
);
//update warehouse
router.put(
  '/warehouse/:idWarehouse',
  // wrapRequestHandler(verifyToken),
  // wrapRequestHandler(checkPermission),
  wrapRequestHandler(warehouseMiddleware),
  wrapRequestHandler(warehouseController.updateWarehouse),
);
// delete warehouse
router.delete(
  '/warehouse/:idWarehouse',
  // wrapRequestHandler(verifyToken),
  // wrapRequestHandler(checkPermission),
  wrapRequestHandler(warehouseController.deleteWarehouse),
);
//fetch list warehouse
router.get(
  '/warehouses',
  // wrapRequestHandler(verifyToken),
  // wrapRequestHandler(checkPermission),
  wrapRequestHandler(warehouseController.fetchListWarehouse),
);
//get detail warehouse by id
router.get(
  '/warehouse/:idWarehouse',
  wrapRequestHandler(warehouseController.getWarehouse),
);
//add category into warehouse
router.post(
  '/warehouse/:idWarehouse',
  wrapRequestHandler(addCategoryMiddleware),
  wrapRequestHandler(warehouseController.addCategoryIntoWarehouse),
);

export default router;
