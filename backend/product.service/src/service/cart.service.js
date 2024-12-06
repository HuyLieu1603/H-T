import cart from '../models/cart.model.js';
import product from '../models/product.model.js';
import mongoose from 'mongoose';

export const cartService = {
  createCartWithProducts: async (userId, products) => {
    // trade string Id to ObjectId
    const productIds = products.map(
      (item) => new mongoose.Types.ObjectId(item.id_product), // Sử dụng 'new'
    );

    // Tìm tất cả sản phẩm có ID trong danh sách
    const existingProducts = await product.find({
      _id: { $in: productIds },
    });

    const productMap = {};
    existingProducts.forEach((product) => {
      productMap[product._id.toString()] = product.price; // Sử dụng _id để tạo bản đồ
    });

    // Tạo một giỏ hàng mới
    const newCart = {
      id_user: userId,
      list_product: products.map((item) => {
        const price = productMap[item.id_product]; // Lấy giá từ bản đồ
        const quantity = item.quantity || 1; // Số lượng, mặc định là 1
        const total = price ? price * quantity : 0; // Tính tổng giá

        return {
          id_product: item.id_product,
          quantity: quantity,
          total: total,
        };
      }),
    };

    return await cart.create(newCart); // Lưu giỏ hàng vào cơ sở dữ liệu
  },

  getCartbyId_user: async (id_user) => {
    const cart = await cart.findOne({ id_user: id_user });
    if (!cart) {
      throw new Error('Giỏ hàng không tồn tại');
    }
    return cart;
  },
};
