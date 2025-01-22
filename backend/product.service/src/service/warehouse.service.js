import mongoose, { Query } from 'mongoose';
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
            $or: [{ nameWarehouse: { $regex: new RegExp(q), $options: 'i' } }],
          },
        ],
      };
    }
    const option = {
      limit: parseInt(_limit),
      page: parseInt(_page),
      populate: populate || populateDefault,
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
      { $push: { listCagory: idCategory } },
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
  fetchListWarehouse: async () => {
    return await warehouse.find();
  },
  //check exist name warehouse
  checkExistName: async (nameWarehouse) => {
    return await warehouse.findOne({ nameWarehouse: nameWarehouse });
  },
  //check exist warehouse in shop
  checkWarehouseInShop: async (idShop) => {
    return await warehouse.findOne(idShop);
  },
  //add category to warehouse
  addCategoryToWarehouse: async (idWarehouse, listCategory) => {
    return await warehouse.findByIdAndUpdate(
      idWarehouse,
      {
        $push: {
          listCategory: {
            $each: listCategory,
          },
        },
      },
      { new: true },
    );
  },
  //delete category in warehouse
  deleteCategoryInWarehouse: async (idWarehouse, listCagory) => {
    return await warehouse.findByIdAndUpdate(
      idWarehouse,
      {
        $pull: { listCategory: { idCategory: { $in: listCagory } } },
      },
      { new: true },
    );
  },
  //check category is exist in warehouse
  checkExistCate: async (idWarehouse, idCategory) => {
    return warehouse.findOne({ _id: idWarehouse, idCategory: idCategory });
  },

  addCategoryToWarehouse: async (idWarehouse, idCategory) => {
    return await warehouse.findByIdAndUpdate(
      idWarehouse,
      {
        $push: { listCategory: { idCategory: idCategory } },
      },
      { new: true },
    );
  },
};
