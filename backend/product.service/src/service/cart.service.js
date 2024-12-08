import cart from '../models/cart.model.js';
import product from '../models/product.model.js';
import mongoose from 'mongoose';

export const cartService = {
  createCartWithProducts: async (userId, products) => {
    const productIds = products.map(
      (item) => new mongoose.Types.ObjectId(item.id_product),
    );
    // get lost existingproduct
    const existingProducts = await product.find({
      _id: { $in: productIds },
    });
    // get map {idproduct:price}
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
    return userCart;
  },

  addProductToCart: async (userCart, productOfUser) => {
    // Kiểm tra xem productOfUser có chứa id_product hay không
    if (!productOfUser || !productOfUser.id_product) {
      throw new Error('Mã sản phẩm là bắt buộc.');
    }

    // Tìm sản phẩm trong giỏ hàng
    const existingCartItem = userCart.list_product.find(
      (item) =>
        item.id_product.toString() === productOfUser.id_product.toString(),
    );
    const quantity = productOfUser.quantity || 1;

    // Lấy giá sản phẩm từ cơ sở dữ liệu
    const existingProduct = await product.findById(productOfUser.id_product);
    if (!existingProduct) {
      throw new Error('Sản phẩm không tồn tại');
    }

    const price = existingProduct.price;

    if (existingCartItem) {
      // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng và tổng giá
      existingCartItem.quantity += quantity;
      existingCartItem.total = price * existingCartItem.quantity;
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm mới
      userCart.list_product.push({
        id_product: productOfUser.id_product,
        quantity: quantity,
        total: price * quantity,
      });
    }

    // Lưu giỏ hàng đã cập nhật
    await userCart.save();
    return userCart; // Trả về giỏ hàng đã cập nhật
  },
};
