import { HTTP_STATUS } from '../common/http-status.common.js';
import { cartService } from '../service/cart.service.js';
import product from '../models/product.model.js';
import cart from '../models/cart.model.js';

export const cartController = {
  createCart: async (req, res) => {
    const body = req.body;
    const id_user = body.id_user;
    const product = body.list_product;

    // checkuserid
    let userCart;
    try {
      userCart = await cartService.checkCartUserbyUserID(id_user);

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

  addProductToCart: async (req, res) => {
    const { list_product } = req.body;
    const { id_user } = req.body;
    const id_product = list_product[0].id_product;
    const quantity = list_product[0].quantity;

    const id_cart = await cartService.getIdCartByIduser(id_user);
    console.log(id_cart);
    const promises = [];
    const check = await cartService.checkItemProductOfCart(id_cart, id_product);
    const tempcart = await cartService.getCartById(id_cart);
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
        message: 'Thêm sản phẩm giỏ hàng thất bại!',
        success: false,
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      message: 'Thêm sản phẩm  thành công!',
      success: true,
      data: tempcart,
    });
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
};
