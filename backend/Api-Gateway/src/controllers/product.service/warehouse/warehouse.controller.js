import axios from 'axios';
import config from '../../../config.js';
import { HTTP_STATUS } from '../../../common/http-status.common.js';

export const warehouseController = {
  //create new warehouse
  createWarehouse: async (req, res) => {
    const data = req.body;

    const result = await axios.post(
      `${process.env.PRODUCT_SERVICE_URL}`,
      data,
      config,
    );
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Tạo kho hàng thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Tạo kho hàng thành công!',
      success: true,
      data: result.data,
    });
  },
  //update warehouse
  updateWarehouse: async (req, res) => {
    const { idWarehouse } = req.params;
    const data = req.body;

    const result = await axios.put(
      `${process.env.PRODUCT_SERVICE_URL}/warehouse/${idWarehouse}`,
      data,
      config,
    );

    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Chỉnh sửa kho hàng thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Chỉnh sửa kho hàng thành công!',
      success: true,
    });
  },
  //get warehouse by id
  getWarehouseById: async (req, res) => {
    const { idWarehouse } = req.params;
    const result = await axios.get(
      `${process.env.PRODUCT_SERVICE_URL}/warehouse/${idWarehouse}`,
    );
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Tải dữ liệu thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Tải dữ liệu thành công!',
      success: true,
      data: result.data,
    });
  },
  //fetch list warehouse
  fetchListWarehouse: async (req, res) => {
    const result = await axios.get(
      `${process.env.PRODUCT_SERVICE_URL}/warehouses`,
    );
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Tải dữ liệu thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Tải dữ liệu thành công!',
      success: true,
      data: result.data,
    });
  },
  //delete warehouse
  deleteWarehouse: async (req, res) => {
    const { idWarehouse } = req.params;

    const result = await axios.delete(
      `${process.env.PRODUCT_SERVICE_URL}/warehouse/${idWarehouse}`,
    );
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
};
