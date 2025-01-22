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
/**
 * @swagger
 * tags:
 *   - name: Warehouses
 *     description: API quản lý kho hàng
 */

/**
 * @swagger
 * /warehouse:
 *   post:
 *     summary: Tạo kho mới
 *     tags: [Warehouses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameWarehouse:
 *                 type: string
 *                 example: Kho Hà Nội
 *               idShop:
 *                 type: string
 *                 example: 678114b266e3f602ff903277
 *     responses:
 *       201:
 *         description: Tạo thành công
 *       400:
 *         description: Lỗi dữ liệu
 */
//create new warehouse
router.post(
  '/warehouse',
  // wrapRequestHandler(verifyToken),
  // wrapRequestHandler(checkPermission),
  wrapRequestHandler(warehouseMiddleware),
  wrapRequestHandler(warehouseController.createWarehouse),
);

/**
 * @swagger
 * /warehouse/{idWarehouse}:
 *   put:
 *     summary: Cập nhật thông tin kho
 *     tags: [Warehouses]
 *     parameters:
 *       - in: path
 *         name: idWarehouse
 *         required: true
 *         schema:
 *           type: string
 *           example: 64bde0e1c2b1d34f8dbbc001
 *         description: ID của kho cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameWarehouse:
 *                 type: string
 *                 example: Kho Hồ Chí Minh
 *               idShop:
 *                 type: string
 *                 example: 64bde0e1c2b1d34f8dbbc001
 *               listCategory:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: [64bde0e1c2b1d34f8dbbc001, 64bde0e1c2b1d34f8dbbc002, 64bde0e1c2b1d34f8dbbc003]
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy kho
 */

//update warehouse
router.put(
  '/warehouse/:idWarehouse',
  // wrapRequestHandler(verifyToken),
  // wrapRequestHandler(checkPermission),
  wrapRequestHandler(warehouseMiddleware),
  wrapRequestHandler(warehouseController.updateWarehouse),
);

/**
 * @swagger
 * /warehouse/{idWarehouse}:
 *   delete:
 *     summary: Xóa kho
 *     tags: [Warehouses]
 *     parameters:
 *       - in: path
 *         name: idWarehouse
 *         required: true
 *         schema:
 *           type: string
 *           example: 64bde0e1c2b1d34f8dbbc001
 *         description: ID của kho cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy kho
 */
// delete warehouse
router.delete(
  '/warehouse/:idWarehouse',
  // wrapRequestHandler(verifyToken),
  // wrapRequestHandler(checkPermission),
  wrapRequestHandler(warehouseController.deleteWarehouse),
);

/**
 * @swagger
 * /warehouses:
 *   get:
 *     summary: Lấy danh sách kho
 *     tags: [Warehouses]
 *     responses:
 *       200:
 *         description: Danh sách kho
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 64bde0e1c2b1d34f8dbbc001
 *                   name:
 *                     type: string
 *                     example: Kho Đà Nẵng
 *                   address:
 *                     type: string
 *                     example: 789 Đường GHI, Đà Nẵng
 */
//fetch list warehouse
router.get(
  '/warehouses',
  // wrapRequestHandler(verifyToken),
  // wrapRequestHandler(checkPermission),
  wrapRequestHandler(warehouseController.fetchListWarehouse),
);

/**
 * @swagger
 * /warehouse/{idWarehouse}:
 *   get:
 *     summary: Tải thông tin chi tiết của 1 kho
 *     tags: [Warehouses]
 *     parameters:
 *       - in: path
 *         name: idWarehouse
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của kho hàng cần tải thông tin
 *     responses:
 *       200:
 *         description: Lấy thông tin thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 64bde0e1c2b1d34f8dbbc001
 *                 nameWarehouse:
 *                   type: string
 *                   example: Cửa hàng điện máy H-T
 *                 idShop:
 *                   type: string
 *                   example: 64bde0e1c2b1d34f8dbbc002
 *                 listCategory:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idCategory:
 *                         type: string
 *                         example: 67552cca6336678026eb76be
 *       400:
 *         description: Lỗi dữ liệu
 */
//get detail warehouse by id
router.get(
  '/warehouse/:idWarehouse',
  wrapRequestHandler(warehouseController.getWarehouse),
);
//add category to warehouse
router.post(
  '/warehouse-category/:idWarehouse',
  wrapRequestHandler(warehouseController.addCategoryToWarehouse),
);

/**
 * @swagger
 * /warehouse/{idWarehouse}:
 *   post:
 *     summary: Thêm danh mục vào kho
 *     tags: [Warehouses]
 *     parameters:
 *       - in: path
 *         name: idWarehouse
 *         required: true
 *         schema:
 *           type: string
 *           example: 64bde0e1c2b1d34f8dbbc001
 *         description: ID của kho
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *                 example: 64bde1e2d2b2d34f9dbbc002
 *     responses:
 *       200:
 *         description: Thêm thành công
 *       400:
 *         description: Lỗi dữ liệu
 */
//add category into warehouse
router.post(
  '/warehouse/:idWarehouse',
  wrapRequestHandler(addCategoryMiddleware),
  wrapRequestHandler(warehouseController.addCategoryIntoWarehouse),
);

/**
 * @swagger
 * /warehouse-delete/{idWarehouse}:
 *   post:
 *     summary: Xóa mềm kho hàng
 *     tags:
 *       - Warehouses
 *     parameters:
 *       - in: path
 *         name: idWarehouse
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của kho cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công!
 *       404:
 *         description: Xóa thất bại!
 */
//remove category from warehouse
router.post(
  '/warehouse-delete/:idWarehouse',
  wrapRequestHandler(warehouseController.removeCategoryFromWarehouse),
);

export default router;
