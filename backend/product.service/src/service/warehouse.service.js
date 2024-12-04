import warehouse from '../models/warehouse.model.js';

export const warehouseService = {
  //create warehouse
  createWarehouse: async (body) => {
    return await warehouse.create(body);
  },
  //update information warehouse
  updateWarehouse: async (idWarehouse, data) => {
    return await warehouse.findByIdAndUpdate(idWarehouse, data, { new: true });
  },
  //add category to listCategory in warehouse
  addCategory: async (idWarehouse, idCategory) => {
    return await warehouse.findByIdAndUpdate(
      { _id: idWarehouse },
      { listCagory: [idCategory] },
      { new: true },
    );
  },
  //delete warehouse
  deleteWarehouse: (idWarehouse) => {
    return warehouse.findByIdAndDelete(idWarehouse);
  },
  //update status warehouse
  updateWarehouse: async (idWarehouse, status) => {
    return await warehouse.findByIdAndUpdate(
      { _id: idWarehouse },
      { status: status },
      { new: true },
    );
  },
  //get warehouse
  getWarehouse: async (idWarehouse) => {
    return await warehouse.findById(idWarehouse);
  },
  //fetch list warehouse (ADMIN)
};
