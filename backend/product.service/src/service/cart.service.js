import cart from '../models/cart.model.js';
import product from '../models/product.model.js';
import mongoose from 'mongoose';

export const cartService = {
  createCartWithProducts: async (userId, products) => {
    const productIds = products.map(
      (item) => new mongoose.Types.ObjectId(item.id_product),
    );

    const existingProducts = await product.find({
      _id: { $in: productIds },
    });

    const productMap = {};
    existingProducts.forEach((product) => {
      productMap[product._id.toString()] = product.price;
    });
    console.log(productMap);
    const newCart = {
      id_user: userId,
      list_product: products.map((item) => {
        const price = productMap[item.id_product];
        const quantity = item.quantity || 1;
        const total = price ? price * quantity : 0;
        console.log(price);
        return {
          id_product: item.id_product,
          quantity: quantity,
          total: total,
        };
      }),
    };

    return await cart.create(newCart);
  },

  checkCartUserbyUserID: async (id_user) => {
    const userCart = await cart.findOne({ id_user: id_user });
    if (!userCart) {
      throw new Error('Giỏ hàng không tồn tại');
    }
    return false;
  },
};
