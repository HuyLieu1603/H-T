import product from '../models/product.model.js';

export const productService = {
  // create a new product
  createProduct: async (data) => {
    return await product.create(data);
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
  deleteProduct : async (idProduct) =>{
   return await product.findByIdAndDelete(idProduct);
  }



};
