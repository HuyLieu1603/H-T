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
    const idCart = await cart.findOne({ id_user: id_user });
    if (!idCart) {
      throw new Error('Giỏ hàng không tồn tại');
    }
    return idCart.id_user;
  },
  // get category by id
  getCartById: async (idcart) => {
    return await cart.findById(idcart);
  },
  //delete category
  deleteCart: async (idCart) => {
    return await cart.findByIdAndDelete(idCart);
  },
  getIdCartByIduser: async (id_user) => {
    const rscart = await cart.findOne({ id_user: id_user });
    return rscart._id;
  },

  addProductToCart: async (idCart, productOfUser) => {
    const idproduct = productOfUser[0].id_product;
    console.log(idproduct);
    //get cart by idart
    const tempcart = await cart.findById(idCart);
    console.log(tempcart);
    // Tìm sản phẩm trong giỏ hàng
    const existingCartItem = tempcart.list_product.find(
      (item) => item.id_product.toString() === idproduct.toString(),
    );
    const quantity = productOfUser[0].quantity || 1;

    // Lấy giá sản phẩm từ cơ sở dữ liệu
    const existingProduct = await product.findById(idproduct);
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
      tempcart.list_product.push({
        id_product: idproduct,
        quantity: productOfUser[0].quantity,
        total: price * productOfUser[0].quantity,
      });
    }

    // Lưu giỏ hàng đã cập nhật
    await tempcart.save();
    return tempcart; // Trả về giỏ hàng đã cập nhật
  },
};
