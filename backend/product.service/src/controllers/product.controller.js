import { HTTP_STATUS } from '../common/http-status.common.js';
import { productService } from '../service/product.service.js';

export const productController = {
  createProduct: async (req, res) => {
    const body = req.body;
    //create
    const newProduct = await productService.createProduct(body);
    if (!newProduct)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Tạo sản phẩm thất bại',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Tạo sản phẩm thành công!',
      success: true,
      data: newProduct,
    });
  },
};
