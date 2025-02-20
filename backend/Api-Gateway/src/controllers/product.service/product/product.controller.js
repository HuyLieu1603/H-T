import axios from 'axios';
import config from '../../../config.js';
import { HTTP_STATUS } from '../../../common/http-status.common.js';

export const productController = {
  createNewProduct: async (req, res) => {
    const data = req.body;
    const result = await axios.post(
      `${process.env.PRODUCT_SERVICE_URL}/product`,
      data,
      config,
    );
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Tạo sản phẩm mới thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Tạo sản phẩm mới thành công!',
      success: true,
      data: result.data,
    });
  },
  getProductById: async (req, res) => {
    const id = req.params.idProduct;
    const result = await axios.get(
      `${process.env.PRODUCT_SERVICE_URL}/product/${id}`,
    );
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Tải danh sách sản phẩm thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Tải danh sách dữ liệu thành công!',
      success: true,
      data: result.data,
    });
  },
  fetchListProduct: async (req, res) => {
    const result = await axios.get(
      `${process.env.PRODUCT_SERVICE_URL}/list-product`,
    );
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Tải danh sách thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Tải danh sách thành công',
      success: true,
      data: result.data,
    });
  },
  updateProductById: async (req, res) => {
    const data = req.body;
    const { idProduct } = req.params;
    const result = await axios.put(
      `${process.env.PRODUCT_SERVICE_URL}/product/${idProduct}`,
      data,
      config,
    );
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Chỉnh sửa  sản phẩm thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Chỉnh sửa sản phẩm thành công!',
      success: true,
    });
  },
  deleteProduct: async (req, res) => {
    const idProduct = req.params.idProduct;
    const result = await axios.delete(
      `${process.env.PRODUCT_SERVICE_URL}/product/${idProduct}`,
    );
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Xóa sản phẩm thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Xóa  sản phẩm thành công!',
      success: true,
    });
  },
};
