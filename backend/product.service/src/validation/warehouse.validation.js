import joi from 'joi';
import mongoose from 'mongoose';
import { categoryService } from '../service/category.service.js';

export const warehouseValidation = joi.object({
  nameWarehouse: joi.string().required().messages({
    'string.empty': 'Tên kho không được để trống',
    'any.required': 'Tên kho không được để trống',
  }),
  listCategory: joi.array().items(
    joi.object({
      idCategory: joi
        .string()
        .required()
        .custom(async (value, helpers) => {
          if (!mongoose.Types.ObjectId.isValid(value))
            return helpers.message('Mã sản phẩm không hợp lệ');
          if (!categoryService.getCategoryById(value))
            return helpers.message('Mã loại không tồn tại!');
        }),
    }),
  ),
  status: joi.boolean().default(true),
});
