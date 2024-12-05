import { HTTP_STATUS } from '../common/http-status.common.js';
import { cartService } from '../service/cart.service.js';

export const cartController = {
  createCart: async (req, res) => {
    const body = req.body;
    console.log(body);
    // create
    const newCart = await cartService.createCartWithProductss(body);
    if (!newCart)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Tạo giỏ hàng không thanh công!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Tạo giỏ hàng thành công!',
      success: true,
      data: newCart,
    });
  },
};
