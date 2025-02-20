import product from '../models/product.model.js';
import warehouse from '../models/warehouse.model.js';
import mongoose from 'mongoose';

export const productService = {
  // create a new product
  createProduct: async (data) => {
    return await product.create(data);
  },
  // fetch list products
  fetchListProduct: async () => {
    return await product.find({ is_deleted: false });
  },
  //fetch list product by shop
  fetchListProductByShop: async (idShop) => {
    const Warehouse = await warehouse.find({ idShop: idShop });
    if (!Warehouse) return null;
    const listWarehouse = Warehouse.map((warehouse) => warehouse._id);
    return await product.find({ idWarehouse: { $ins: listWarehouse } });
  },
  // get a product by id
  getProductById: async (idProduct) => {
    return await product.findById(idProduct);
  },
  // update product by id
  updateProduct: async (idProduct, data) => {
    return await product.findByIdAndUpdate({ _id: idProduct }, data, {
      new: true,
    });
  },
  getMoneyByIdProduct: async (idProduct) => {
    const cartDocument = await product.findById(idProduct).select('price'); // Chỉ lấy trường total
    return cartDocument ? cartDocument.price : null; // Trả về total hoặc null nếu không tìm thấy
  },
  // delete product
  deleteProduct: async (idProduct) => {
    const tempProduct = await product.findById(idProduct);
    tempProduct.is_deleted = !tempProduct.is_deleted;
    await tempProduct.save();
    return tempProduct;
  },

  fetchListProductbyCategory: async (idCategory) => {
    return await product.find({ idCategory: idCategory, is_deleted: false });
  },
};
