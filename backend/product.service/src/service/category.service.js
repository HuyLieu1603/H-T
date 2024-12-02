import category from '../models/category.model.js';

export const categoryService = {
  // create new category
  createCategory: async (data) => {
    return await category.create(data);
  },
  // fetch list category
  fetchListCategory: async () => {
    return await category.find();
  },
  // get category by id
  getCategoryById: async (idCategory) => {
    return await category.findById(idCategory);
  },
  //
};
