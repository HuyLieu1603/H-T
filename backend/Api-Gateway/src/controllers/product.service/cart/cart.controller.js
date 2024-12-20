import axios from 'axios';
import config from '../../../config.js';
import { HTTP_STATUS } from '../../../common/http-status.common.js';

export const cartController = {
  createproduct: async (req, res) => {
    const body = req.body;
    const cart = await axios.post(
      `${process.env.PRODUCT_SERVICE_URL}/cart`,
      body,
      config,
    );
    if (!cart)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Tạo giỏ hàng thành công',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'tạo giỏ hàng thất bại!',
      success: true,
      data: cart.data,
    });
  },
  addProductToCart: async (req, res) => {
    const body = req.body;
    const { id_user } = req.params;
    const cart = await axios.post(
      `${process.env.PRODUCT_SERVICE_URL}/cart/add/${id_user}`,
      body,
      config,
    );
    if (!cart)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Thêm sản phẩm thất bại',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Thêm sản phẩm thành công!',
      success: true,
      data: cart.data,
    });
  },
};
