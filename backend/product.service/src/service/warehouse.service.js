import { Query } from 'mongoose';
import warehouse from '../models/warehouse.model.js';

export const warehouseService = {
  //option warehouse
  optionWarehouse: async (params) => {
    const { _limit = 10, _page = 1, q, populate, rest } = params;
    let populateDefault = [
      {
        path: 'product',
        select: '_id nameProduct quantity',
      },
    ];
    let query = {};
    if (q) {
      query = {
        $and: [
          {
            $or: [{ nameWarehouse: { $regax: new RegExp(q), $options: 'i' } }],
          },
        ],
      };
    }
    const option = {
      limit: parseInt(_limit),
      page: parseInt(_page),
      populate: populateDefault,
      sort: { createdAt: -1 },
    };
    return { option, query };
  },
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
  updateStatusWarehouse: async (idWarehouse, status) => {
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
  fetchListWarehouse: async (optionWarehouse) => {
    return await warehouse.find(optionWarehouse);
  },
};
