import axios from 'axios';
import config from '../../../config.js';
import { HTTP_STATUS } from '../../../common/http-status.common.js';

export const categoryController = {
  //create category
  createCategory: async (req, res) => {
    const data = req.body;

    const result = await axios.post(
      `${process.env.PRODUCT_SERVICE_URL}/category`,
      data,
      config,
    );

    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Tạo loại sản phẩm thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Tạo loại sản phẩm thành công!',
      success: true,
      data: result.data,
    });
  },
  //get category by id
  getCategoryById: async (req, res) => {
    const { id } = req.params;

    const result = await axios.get(
      `${process.env.PRODUCT_SERVICE_URL}/category/${id}`,
    );
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Tải dữ liệu thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Tải dữ liệu thành công!',
      success: true,
    });
  },
  //fetch list category
  fetchListCategory: async (req, res) => {
    const result = await axios.get(
      `${process.env.PRODUCT_SERVICE_URL}/list-category`,
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
  //update category by id
  updateCategoryById: async (req, res) => {
    const data = req.body;
    const { idCategory } = req.params;
    const result = await axios.put(
      `${process.env.PRODUCT_SERVICE_URL}/category/${idCategory}`,
      data,
      config,
    );
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Chỉnh sửa loại sản phẩm thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Chỉnh sửa loại sản phẩm thành công!',
      success: true,
    });
  },
  //delete category
  deleteCategory: async (req, res) => {
    const { idCategory } = req.params;
    const result = await axios.delete(
      `${process.env.PRODUCT_SERVICE_URL}/category/${idCategory}`,
    );
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Xóa loại sản phẩm thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Xóa loại sản phẩm thành công!',
      success: true,
    });
  },
};
