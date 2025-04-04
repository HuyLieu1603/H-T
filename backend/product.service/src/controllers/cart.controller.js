import { HTTP_STATUS } from '../common/http-status.common.js';
import { cartService } from '../service/cart.service.js';
import product from '../models/product.model.js';
import cart from '../models/cart.model.js';

export const cartController = {
  createCart: async (req, res) => {
    const body = req.body;
    const { idUser } = req.user;
    const product = body.list_product;

    // checkuserid
    let userCart;
    try {
      userCart = await cartService.checkCartUserbyUserID(idUser);

      const idcart = await cartService.getIdCartByIduser(userCart);

      const updatedCart = await cartService.addProductToCart(idcart, product);

      return res.status(HTTP_STATUS.OK).json({
        message: 'Thêm sản phẩm vào giỏ hàng thành công!',
        success: true,
        data: updatedCart,
      });
    } catch (error) {
      // Nếu giỏ hàng không tồn tại, tạo giỏ hàng mới
      const newCart = await cartService.createCartWithProducts(body);

      // Kiểm tra việc tạo giỏ hàng
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
    }
  },
  increaseQuantityItem: async (req, res) => {
    const { id_cart, id_product } = req.body;
    console.log('Request Body:', req.body);
    const cart = await cartService.increaseQuantityItem(id_cart, id_product);
    if (!cart) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Không tìm thấy giỏ hàng hoặc sản phẩm',
        success: false,
      });
    }
    console.log(cart);
    const productmap = await cartService.createProductMap(cart);
    console.log(productmap);
    const result = cartService.updateCartTotal(cart, productmap);
    console.log(result);
    if (!result) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Thất bại update',
        success: false,
      });
    } else {
      return res.status(HTTP_STATUS.OK).json({
        message: 'update thành công',
        success: true,
      });
    }
  },
  decreaseQuantityItem: async (req, res) => {
    const { id_cart, id_product } = req.body;
    console.log('Request Body:', req.body);
    const cart = await cartService.decreaseQuantityItem(id_cart, id_product);
    if (!cart) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Không tìm thấy giỏ hàng hoặc sản phẩm',
        success: false,
      });
    }
    console.log(cart);
    const productmap = await cartService.createProductMap(cart);
    console.log(productmap);
    const result = cartService.updateCartTotal(cart, productmap);
    console.log(result);
    if (!result) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Thất bại update',
        success: false,
      });
    } else {
      return res.status(HTTP_STATUS.OK).json({
        message: 'update thành công',
        success: true,
      });
    }
  },
  addProductToCart: async (req, res) => {
    const { list_product } = req.body;
    const { UserId } = req.body;

    console.log(list_product);
    console.log(UserId);
    const id_product = list_product[0].id_product;
    const quantity = list_product[0].quantity;

    const id_cart = await cartService.getIdCartByIduser(UserId);
    const promises = [];
    const check = await cartService.checkItemProductOfCart(id_cart, id_product);

    if (check) {
      const temp = await cartService.updateQuantityForAvilableItem(
        id_cart,
        id_product,
        quantity,
      );
      promises.push(temp);
    } else {
      const temp = await cartService.addProductToCart(
        id_cart,
        id_product,
        quantity,
      );
      promises.push(temp);
    }
    const result = await Promise.all(promises);

    if (!result) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'cập nhập số lượng thất bại',
        success: false,
      });
    } else {
      return res.status(HTTP_STATUS.OK).json({
        message: 'cập nhập số lượng thành công',
        success: true,
      });
    }
  },
  updateProductQuantityInCart: async (req, res) => {
    const { idCart, product } = req.body;

    // validation
    if (!idCart || !product || product.length === 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Thiếu tham số cần thiết.',
        success: false,
      });
    }

    // get only one the first id in array
    const { id_product: idProduct, quantity: newQuantity } = product[0];

    // check quantity
    if (typeof newQuantity !== 'number') {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Số lượng không hợp lệ.',
        success: false,
      });
    }

    try {
      const updatedCart = await cartService.updateProductQuantityInCart(
        idCart,
        idProduct,
        newQuantity,
      );

      return res.status(HTTP_STATUS.OK).json({
        message: 'Cập nhật số lượng sản phẩm thành công!',
        success: true,
        data: updatedCart,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: error.message,
        success: false,
      });
    }
  },
  deleteProductInCart: async (req, res) => {
    const { list_product } = req.body;
    const { idCart } = req.params;
    console.log(list_product, idCart);
    const result = await cartService.deleteProductInListProduct(
      { _id: idCart },
      {
        list_product: list_product,
      },
    );
    console.log(result);
  },
  deleteProductFromCart: async (req, res) => {
    const { idcart, idProduct } = req.body;
    if (!idcart || !idProduct) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Thiếu tham số cần thiết.',
        success: false,
      });
    }

    const cartupdate = await cartService.updateProductQuantityInCart(
      idcart,
      idProduct,
      0,
    );
    // Kiểm tra tham số cần thiết

    try {
      // Gọi dịch vụ để xóa sản phẩm khỏi giỏ hàng
      const updatedCart = await cartService.deleteProductFromCart(
        idcart,
        idProduct,
      );

      if (!updatedCart) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          message: 'Không tìm thấy giỏ hàng hoặc sản phẩm để xóa.',
          success: false,
        });
      }

      return res.status(HTTP_STATUS.OK).json({
        message: 'Xóa sản phẩm khỏi giỏ hàng thành công!',
        success: true,
        data: updatedCart,
      });
    } catch (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: error.message,
        success: false,
      });
    }
  },
  createNewCart: async (req, res) => {
    const { UserId } = req.body;
    console.log(UserId);
    const result = await cartService.createnewcart(UserId);
    console.log(UserId);
    if (!result) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Tạo Giỏ Hàng Thất Bại!',
        success: false,
      });
    } else {
      return res.status(HTTP_STATUS.OK).json({
        message: 'Tạo Giỏ Hàng Thành Công!',
        success: true,
        data: result,
      });
    }
  },
};
