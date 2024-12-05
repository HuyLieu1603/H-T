import cart from '../models/cart.model.js';

export const cartService = {
  // create new cart with products from id_user
  createCartWithProducts: async (userId, products) => {
    // Create a newCart
    const newCart = {
      id_user: userId,
      list_product: products.map((product) => ({
        id_product: product.id_product, // ID sản phẩm
        quantity: product.quantity || 1, // Số lượng, mặc định là 1
        total: product.price * (product.quantity || 1), // Tính tổng giá cho sản phẩm
      })),
    };

    return await cart.create(newCart); // Lưu giỏ hàng vào cơ sở dữ liệu
  },
  createCartWithProductss: async (data) => {
    // Create a newCart
    return await cart.create(data); // Lưu giỏ hàng vào cơ sở dữ liệu
  },

  // Find a cart of a user
  getCartbyId_user: async (id_user) => {
    const cart = await cart.findOne({ id_user: id_user });
    if (!cart) {
      throw new Error('Gio Hang Khong Ton Tai');
    }
    return cart;
  },
};
