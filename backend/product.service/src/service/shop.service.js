import shop from '../models/shop.model.js';

export const shopService = {
  //create new shop
  createNewShop: async (body) => {
    return await shop.create(body);
  },
  //get shop by id
  getShopById: async (idShop) => {
    return await shop.findById(idShop);
  },
  //fetch list shop
  fetchListShop: async () => {
    return await shop.find();
  },
  //update shop
  updateShopById: async (idShop, data) => {
    return await shop.findByIdAndUpdate({ _id: idShop }, data, { new: true });
  },
  //update status shop

  //delete shop
};
