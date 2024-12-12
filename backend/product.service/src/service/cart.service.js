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
    // total for all products
    const total = products.reduce((acc, item) => {
      // price = 0 if id_product == undefine
      const price = productMap[item.id_product];
      const quantity = item.quantity || 1;
      return acc + (price ? price * quantity : 0);
    }, 0);
    const newCart = {
      id_user: userId,
      list_product: products.map((item) => ({
        id_product: item.id_product,
        quantity: item.quantity || 1,
      })),
      total: total,
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
    const quantity = productOfUser[0].quantity || 1;

    //Get cart by id
    const tempcart = await cart.findById(idCart);
    if (!tempcart) {
      throw new Error('Giỏ hàng không tồn tại');
    }

    // get product from database to check
    const existingProduct = await product.findById(idproduct);
    if (!existingProduct) {
      throw new Error('Sản phẩm không tồn tại');
    }

    const existingCartItem = tempcart.list_product.find(
      (item) => item.id_product.toString() === idproduct.toString(),
    );

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      tempcart.list_product.push({
        id_product: idproduct,
        quantity: quantity,
      });
    }

    //create productmap to total price
    const productMap = {};
    const productIds = tempcart.list_product.map((item) => item.id_product);
    const existingProducts = await product.find({ _id: { $in: productIds } });

    existingProducts.forEach((product) => {
      productMap[product._id.toString()] = product.price; // Lưu giá vào productMap
    });

    // update total
    tempcart.total = tempcart.list_product.reduce((acc, item) => {
      const itemPrice = productMap[item.id_product.toString()]; // Lấy giá từ productMap
      return acc + (itemPrice ? itemPrice * item.quantity : 0);
    }, 0);

    await tempcart.save();
    return tempcart;
  },
  updateCartTotal: async (cart) => {
    const productIds = cart.list_product.map((item) => item.id_product);
    const existingProducts = await product.find({ _id: { $in: productIds } });

    const productMap = {};
    existingProducts.forEach((prod) => {
      productMap[prod._id.toString()] = prod.price;
    });

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
};
