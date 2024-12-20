import { HTTP_STATUS } from '../common/http-status.common.js';
import warehouse from '../models/warehouse.model.js';
import { warehouseService } from '../service/warehouse.service.js';

export const warehouseController = {
  // create new warehouse
  createWarehouse: async (req, res) => {
    const body = req.body;
    // create
    const newWarehouse = await warehouseService.createWarehouse(body);
    if (!newWarehouse)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Tạo kho hàng thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Tạo kho hàng thành công!',
      success: true,
      data: newWarehouse,
    });
  },
  // update warehouse
  updateWarehouse: async (req, res) => {
    const { idWarehouse } = req.params;
    const data = req.body;
    // update
    const result = await warehouseService.updateWarehouse(idWarehouse, data);
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Cập nhật thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Cập nhật thành công!',
      success: true,
      data: result,
    });
  },
  //delete warehouse
  deleteWarehouse: async (req, res) => {
    const { idWarehouse } = req.params;
    // delete warehouse
    const result = await warehouseService.deleteWarehouse(idWarehouse);
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Xóa kho hàng thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Xóa kho hàng thành công!',
      success: true,
    });
  },
  //get warehouse
  getWarehouse: async (req, res) => {
    const { idWarehouse } = req.params;
    // get warehouse
    const warehouseDetail = await warehouseService.getWarehouse(idWarehouse);
    if (!warehouseDetail)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Tải thông tin thất bại',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Tải thông tin kho hàng thành công',
      success: true,
      data: warehouseDetail,
    });
  },
  //fetch list warehouse option
  paginateWarehouse: async (req, res) => {
    const params = req.query;

    const { option, query } = await warehouseService.optionWarehouse(params);

    const warehouseList = await warehouse.painate(query, option);
    if (!warehouseList)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Tải dữ liệu thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Tải dữ liệu thành công!',
      success: true,
      data: warehouseList,
    });
  },
  //fetch list warehouse (ADMIN)
  fetchListWarehouse: async (req, res) => {
    const params = req.params;
    //get option from user
    const option = await warehouseService.optionWarehouse(params);
    //fetch list by option
    const listWarehouse = await warehouseService.fetchListWarehouse(option);
    if (!listWarehouse)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Tải danh sách kho hàng thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Tải danh sách kho hàng thành công!',
      success: true,
      data: listWarehouse,
    });
  },
};
