import product from '../models/product.model.js';
import warehouse from '../models/warehouse.model.js';
import category from '../models/category.model.js';
import mongoose from 'mongoose';
import { HTTP_STATUS } from '../common/http-status.common.js';
export const productService = {
  // create a new product
  createProduct: async (data) => {
    try {
      // Tạo ObjectId từ idCategory và idWarehouse
      const categoryId = new mongoose.Types.ObjectId(data.idCategory);
      const warehouseId = new mongoose.Types.ObjectId(data.idWarehouse);

      // Kiểm tra sự tồn tại của category và warehouse
      const existingCategory = await category.findById(categoryId);
      const existingWarehouse = await warehouse.findById(warehouseId);

      if (!existingCategory || !existingWarehouse) {
        return {
          status: HTTP_STATUS.BAD_REQUEST,
          body: {
            message: 'Mã kho hoặc mã loại sản phẩm không hợp lệ',
            success: false,
          },
        };
      }

      // Tạo đối tượng sản phẩm mới
      const newProduct = {
        nameProduct: data.nameProduct,
        price: data.price,
        quantity: data.quantity,
        idCategory: categoryId,
        idWarehouse: warehouseId,
        desc: data.desc,
        Images: data.Images || [], // Đảm bảo Images là mảng
        status: data.status,
        is_deleted: data.is_deleted,
      };

      // Lưu sản phẩm mới vào cơ sở dữ liệu
      return await product.create(newProduct);
    } catch (error) {
      console.error('Lỗi khi tạo sản phẩm:', error);
      return {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        body: {
          message: 'Đã xảy ra lỗi khi tạo sản phẩm',
          success: false,
        },
      };
    }
  },
  // fetch list products
  fetchListProduct: async () => {
    return await product.find();
  },

  // get a product by id
  getProductById: async (idProduct) => {
    return await product.findById(idProduct);
  },
  // update product by id
  updateProduct: async (idProduct, data) => {
    return await product.findByIdAndUpdate(idProduct, data, { new: true });
  },

  // delete product
  deleteProduct: async (idProduct) => {
    return await product.findByIdAndDelete(idProduct);
  },
};
