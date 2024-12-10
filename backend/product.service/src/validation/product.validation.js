import joi from 'joi';
import mongoose from 'mongoose';
import product from '../models/product.model.js';
export const productValidation = joi.object({
  nameProduct: joi.string().required().messages({
    'string.empty': 'Tên sản phẩm không được để trống',
    'any.required': 'Tên sản phẩm không được để trống',
  }),
  //
  desc: joi.string(),
  price: joi.number().required().messages({
    'number.base': 'Giá phải là một số',
    'any.required': 'Giá không được để trống',
  }),
  quantity: joi.number(),
  idCategory: joi
    .string()
    .required()
    .custom((value, helper) => {
      if (!mongoose.Types.ObjectId.isValid(value))
        return helper.message('Mã loại hàng không hợp lệ');
      if (!product.findById(value))
        return helper.messages('Mã loại hàng không tồn tại');
    }),
  idWarehouse: joi
    .string()
    .required()
    .custom((value, helper) => {
      if (!mongoose.Types.ObjectId.isValid(value))
        return helper.message('Mã shop không hợp lệ');
      if (!product.findById(value))
        return helper.messages('Mã shop không tồn tại');
    }),
  Images: joi.array().items(
    joi.object({
      url: joi.string().uri(),
      public_id: joi.string(),
    }),
  ),
  productStatus: joi
    .string()
    .valid('Sẵn Sàng', 'Không sẵn sàng')
    .default('Sẵn Sàng'),
  is_deleted: joi.boolean().default(false),
});
