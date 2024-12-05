import { HTTP_STATUS } from '../common/http-status.common.js';
import { warehouseController } from '../controllers/warehouse.controller.js';
import { warehouseMiddleware } from '../middlewares/warehouse.middleware.js';
import { verifyToken } from '../middlewares/verify-token.middleware.js';
import { wrapRequestHandler } from '../utils/handle.util.js';
import express from 'express';

const router = express.Router();

//create new warehouse
router.post(
  '/warehouse',
  wrapRequestHandler(verifyToken),
  //Thêm phân quyền ở đây
  wrapRequestHandler(warehouseMiddleware),
  wrapRequestHandler(warehouseController.createWarehouse),
);
//update warehouse
router.put(
  '/warehouse/:idWarehouse',
  wrapRequestHandler(verifyToken),
  //Thêm phân quyền ở đây
  wrapRequestHandler(warehouseMiddleware),
  wrapRequestHandler(warehouseController.updateWarehouse),
);
// delete warehouse
router.delete(
  '/warehouse/:idWarehouse',
  wrapRequestHandler(verifyToken),
  //Thêm phân quyền ở đây
  wrapRequestHandler(warehouseController.deleteWarehouse),
);
//fetch list warehouse
router.get(
  '/warehouses',
  wrapRequestHandler(verifyToken),
  //Thêm phân quyền ở đây
  wrapRequestHandler(warehouseController.fetchListWarehouse),
);
//get detail warehouse by id
router.get(
  '/warehouse/:idWarehouse',
  wrapRequestHandler(warehouseController.getWarehouse),
);
