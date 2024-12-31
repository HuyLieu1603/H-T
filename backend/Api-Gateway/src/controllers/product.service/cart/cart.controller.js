import axios from 'axios';
import config from '../../../config.js';
import { HTTP_STATUS } from '../../../common/http-status.common.js';

export const cartController = {
  createNewCart: async (req, res) => {
    const { UserId } = req.user;
    console.log(UserId);
    const result = await axios.post(
      `${process.env.PRODUCT_SERVICE_URL}/cart/cartCreateNew`,
      { UserId },
      config,
    );
    console.log(result.data);
    if (result) {
      return res.status(HTTP_STATUS.OK).json({
        message: 'Tạo Giỏ Hàng Thành Công!',
        success: true,
      });
    } else {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Tạo Giỏ Hàng Thất Bại!',
        success: false,
      });
    }
  },
  addProductToCart: async (req, res) => {
    const { list_product } = req.body;
    const { UserId } = req.user;

    const cart = await axios.post(
      `${process.env.PRODUCT_SERVICE_URL}/cart/add`,

      { list_product, UserId },
      config,
    );
    if (!cart)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Thêm sản phẩm  thất bại',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'thêm sản phẩm thành công!',
      success: true,
      data: cart.data,
    });
  },
  // addProductToCart: async (req, res) => {
  //   const body = req.body;
  //   const { id_user } = req.params;
  //   const cart = await axios.post(
  //     `${process.env.PRODUCT_SERVICE_URL}/cart/add/${id_user}`,
  //     body,
  //     config,
  //   );
  //   if (!cart)
  //     return res.status(HTTP_STATUS.BAD_REQUEST).json({
  //       message: 'Thêm sản phẩm thất bại',
  //       success: false,
  //     });
  //   return res.status(HTTP_STATUS.OK).json({
  //     message: 'Thêm sản phẩm thành công!',
  //     success: true,
  //     data: cart.data,
  //   });
  // },
};
