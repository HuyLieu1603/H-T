import cart from '../models/cart.model.js';
import product from '../models/product.model.js';
import mongoose from 'mongoose';
import { productService } from './product.service.js';

export const cartService = {
  createCartWithProducts: async (body) => {
    const { id_user, list_product } = body;

    const productIds = list_product.map((item) => item.id_product);

    // Kiểm tra sản phẩm tồn tại
    const existingProducts = await product.find({ _id: { $in: productIds } });
    const existingIds = existingProducts.map((prod) => prod._id.toString());
    const nonExistentIds = productIds.filter((id) => !existingIds.includes(id));
    const validProduct = list_product.filter((item) =>
      existingIds.includes(item.id_product),
    );

    if (nonExistentIds.length > 0) {
      console.warn(
        `Sản phẩm với ID ${nonExistentIds.join(', ')} không tồn tại`,
      );
    }

    if (validProduct.length === 0) {
      return {
        success: false,
        message: 'Không có sản phẩm hợp lệ để thêm vào giỏ hàng.',
      };
    }

    // Lấy thông tin sản phẩm đã tồn tại
    const productIdList = validProduct.map(
      (item) => new mongoose.Types.ObjectId(item.id_product),
    );
    const existingProductDetails = await product.find({
      _id: { $in: productIdList },
    });

    // Tạo bản đồ giá sản phẩm
    const productMap = {};
    existingProductDetails.forEach((product) => {
      productMap[product._id.toString()] = product.price;
    });

    // Tính tổng giá trị giỏ hàng
    const total = validProduct.reduce((acc, item) => {
      const price = productMap[item.id_product];
      const quantity = item.quantity || 1;
      return acc + (price ? price * quantity : 0);
    }, 0);

    const newCart = {
      id_user: id_user,
      list_product: validProduct.map((item) => ({
        id_product: item.id_product,
        quantity: item.quantity || 1,
      })),
      total: total,
    };

    return await cart.create(newCart);
  },
  /*
 checkCartUserbyUserID: async (id_user) => {
    const idCart = await cart.findOne({ id_user: id_user });
    if (!idCart) {
      throw new Error('Giỏ hàng không tồn tại');
    }
    return idCart.id_user;
  },
  */

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

  /*
  updatequantity: async (product, cart, quantity) => {
    const existingCartItem = await cart.list_product.find(
      (item) => item.id_product === product.id_product,
    );

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      cart.list_product.push({
        id_product: product.id_product,
        quantity: quantity,
      });
    }
    await cart.save();
  },
  */
  createProductMap: async (cart) => {
    const productMap = {};
    const productIds = cart.list_product.map((item) => item.id_product);
    const existingProducts = await product.find({ _id: { $in: productIds } });
    existingProducts.forEach((product) => {
      productMap[product._id.toString()] = product.price; // Lưu giá vào productMap
    });

    return await productMap;
  },

  checkItemProductOfCart: async (idCart, idProduct) => {
    const tempcart = await cartService.getCartById(idCart);

    const exists = tempcart.list_product.some(
      (item) => item.id_product.toString() === idProduct.toString(),
    );

    return exists;
  },
  getTotalByIdcart: async (idCart) => {
    const tempcart = await cartService.getCartById(idCart);
    const total = tempcart.total;
    return total;
  },
  updateQuantityForAvilableItem: async (idCart, idProduct, quantity) => {
    const Total = await cartService.getTotalByIdcart(idCart);
    const price = await productService.getMoneyByIdProduct(idProduct);
    const LastTotal = Total + price * quantity;
    return await cart.findOneAndUpdate(
      { _id: idCart, 'list_product.id_product': idProduct },
      {
        $inc: {
          'list_product.$.quantity': quantity, // Tăng số lượng sản phẩm
        },
        $set: {
          total: LastTotal, // Cập nhật giá trị total
        },
      },
      { new: true },
    );
  },
  deleteProductInListProduct: async (idCart, ListProduct) => {
    return await cart.findByIdAndUpdate(
      idCart,
      {
        $pull: { list_product: { id_product: { $in: ListProduct } } },
      },
      { new: true },
    );
  },

  addProductToCart: async (idCart, idproduct, quantity) => {
    const tempcart = await cartService.getCartById(idCart);
    const currenttotal = tempcart.total;
    const moneyOfItem = await productService.getMoneyByIdProduct(idproduct);
    const Total = currenttotal + moneyOfItem * quantity;
    await tempcart.list_product.push({
      id_product: idproduct,
      quantity: quantity,
      total: Total,
    });
    return await tempcart.save();
  },

  updateCartTotal: async (cart, productMap) => {
    cart.total = cart.list_product.reduce((acc, item) => {
      const price = productMap[item.id_product];
      return acc + (price ? price * item.quantity : 0);
    }, 0);
    return cart.save();
  },

  updateProductQuantityInCart: async (idCart, idProduct, newQuantity) => {
    // Lấy giỏ hàng theo id
    const tempcart = await cart.findById(idCart);
    if (!tempcart) {
      throw new Error('Giỏ hàng không tồn tại');
    }
    // Tìm sản phẩm trong giỏ hàng
    const existingCartItem = tempcart.list_product.find(
      (item) => item.id_product.toString() === idProduct.toString(),
    );

    if (!existingCartItem) {
      throw new Error('Sản phẩm không tồn tại trong giỏ hàng');
    }

    // Cập nhật số lượng sản phẩm
    existingCartItem.quantity = newQuantity;

    // Cập nhật tổng giá trị của giỏ hàng
    const productIds = tempcart.list_product.map((item) => item.id_product);
    const existingProducts = await product.find({ _id: { $in: productIds } });

    const productMap = {};
    existingProducts.forEach((product) => {
      productMap[product._id.toString()] = product.price;
    });

    // Tính toán lại tổng giá trị giỏ hàng
    tempcart.total = tempcart.list_product.reduce((acc, item) => {
      const itemPrice = productMap[item.id_product.toString()];
      return acc + (itemPrice ? itemPrice * item.quantity : 0);
    }, 0);

    // Lưu giỏ hàng đã cập nhật
    await tempcart.save(); // Lưu thay đổi vào cơ sở dữ liệu
    return tempcart; // Trả về giỏ hàng đã cập nhật
  },
  deleteProductFromCart: async function (idCart, idProduct) {
    // create tempcart to handle
    const tempcart = await cart.findById(idCart);
    if (!tempcart) {
      throw new Error('Giỏ hàng không tồn tại.');
    }

    // Tìm vị trí sản phẩm trong giỏ hàng
    const productIndex = tempcart.list_product.findIndex(
      (item) => item.id_product.toString() === idProduct.toString(),
    );

    if (productIndex === -1) {
      throw new Error('Sản phẩm không tồn tại trong giỏ hàng.');
    }

    // Xóa sản phẩm khỏi giỏ hàng
    tempcart.list_product.splice(productIndex, 1);

    // Lưu giỏ hàng đã cập nhật
    await tempcart.save();

    return tempcart; // Trả về giỏ hàng đã cập nhật
  },
  createnewcart: async function (id_user) {
    // create a cart without data
    return await cart.create(id_user);
  },
  // up quantity of one a item producttion
  increaseQuantityItem: async function (id_cart, id_product) {
    return await cart.findOneAndUpdate(
      { _id: id_cart, 'list_product.id_product': id_product },
      {
        $inc: {
          'list_product.$.quantity': 1, // Tăng số lượng sản phẩm
        },
      },
      { new: true },
    );
  },
};
