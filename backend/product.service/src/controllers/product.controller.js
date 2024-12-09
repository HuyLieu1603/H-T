import { HTTP_STATUS } from '../common/http-status.common.js';
import { productService } from '../service/product.service.js';

export const productController = {
  createProduct: async (req, res) => {
    const body = req.body;
    //create
    const newProduct = await productService.createProduct(body);
    if (!newProduct)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Tạo sản phẩm thất bại',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Tạo sản phẩm thành công!',
      success: true,
      data: newProduct,
    });
  },
  // getProductById
  getProductById: async (req, res) => {
    const { idProduct } = req.params;
    // get product detail
    const product = await productService.getProductById(idProduct);
    if (!product)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Không tìm thấy sản phẩm',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Lấy sản phẩm thành công',
      success: true,
      data: product,
    });
  },
  //fetch list product
  fetchListProduct: async (req, res) => {
    //fetch list
    const listProduct = await productService.fetchListProduct();
    if (!listProduct)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Tải danh sách  sản phẩm thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Tải danh sách  sản phẩm thành công!',
      success: true,
      data: listProduct,
    });
  },
  //update Product
  updateProduct: async (req, res) => {
    const body = req.body;
    const { idProduct } = req.params;
    //updateProduct
    const result = await productService.updateProduct(idProduct, body);
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Cập nhật  sản phẩm thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Cập nhật  sản phẩm thành công!',
      success: true,
      data: result,
    });
  },
  //delete product
  deleteProduct: async (req, res) => {
    const { idProduct } = req.params;
    const result = await productService.deleteProduct(idProduct);
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Xóa sản phẩm thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Xóa  sản phẩm thành công!',
      success: true,
    });
  },
};
