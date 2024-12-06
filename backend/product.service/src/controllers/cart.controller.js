import { HTTP_STATUS } from '../common/http-status.common.js';
import { cartService } from '../service/cart.service.js';
import product from '../models/product.model.js';

export const cartController = {
  createCart: async (req, res) => {
    const body = req.body;
    console.log(body);

    // Lấy danh sách id_product từ body.list_product
    const productIds = body.list_product.map((item) => item.id_product);

    // Kiểm tra tồn tại của tất cả id_product cùng một lúc
    const existingProducts = await product.find({ _id: { $in: productIds } });

    // Lưu danh sách các id_product đã tồn tại
    const existingIds = existingProducts.map((prod) => prod._id.toString());

    // Kiểm tra xem có id_product nào không tồn tại
    const nonExistentIds = productIds.filter((id) => !existingIds.includes(id));

    // Lưu danh sách sản phẩm hợp lệ vào req.validProducts
    req.validProducts = body.list_product.filter((item) =>
      existingIds.includes(item.id_product),
    );

    if (nonExistentIds.length > 0) {
      console.warn(
        `Sản phẩm với ID ${nonExistentIds.join(', ')} không tồn tại`,
      );
    }

    const validProducts = req.validProducts;

    // Kiểm tra xem có sản phẩm hợp lệ không
    if (validProducts.length === 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Không có sản phẩm hợp lệ để thêm vào giỏ hàng.',
        success: false,
      });
    }

    // Tạo giỏ hàng mới với các sản phẩm hợp lệ
    const newCart = await cartService.createCartWithProducts(
      body.id_user,
      validProducts,
    );

    if (!newCart) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Tạo giỏ hàng không thành công!',
        success: false,
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      message: 'Tạo giỏ hàng thành công!',
      success: true,
      data: newCart,
    });
  },
};
