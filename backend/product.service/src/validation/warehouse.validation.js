import joi from 'joi';
import mongoose from 'mongoose';
import { categoryService } from '../service/category.service.js';
import { shopService } from '../service/shop.service.js';
import { warehouseService } from '../service/warehouse.service.js';

export const warehouseValidation = joi.object({
  nameWarehouse: joi
    .string()
    .required()
    .custom(async (value, helpers) => {
      if (!warehouseService.checkExistName)
        return helpers.message('Tên kho đã tồn tại!');
      return value;
    })
    .messages({
      'string.empty': 'Tên kho không được để trống',
      'any.required': 'Tên kho không được để trống',
    }),
  idShop: joi
    .string()
    .required()
    .custom((value, helper) => {
      if (!mongoose.Types.ObjectId.isValid(value))
        return helper.message('Mã cửa hàng không hợp lệ');
      if (!shopService.getShopById(value))
        return helper.message('Mã cửa hàng không tồn tại');
    }),
  listCategory: joi.array().items(
    joi.object({
      idCategory: joi
        .string()
        .required()
        .custom(async (value, helpers) => {
          if (!mongoose.Types.ObjectId.isValid(value))
            return helpers.message('Mã loại không hợp lệ');
          if (!categoryService.getCategoryById(value))
            return helpers.message('Mã loại không tồn tại!');
        }),
    }),
  ),
  status: joi.boolean().default(true),
});
