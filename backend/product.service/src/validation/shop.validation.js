import joi from 'joi';
import mongoose from 'mongoose';
import { warehouseService } from '../service/warehouse.service';

export const shopValidation = joi.object({
  nameShop: joi.string().min(3).max(5).required().messages({
    'string.empty': 'Tên shop không được để trống',
    'any.required': 'Tên shop không được để trống',
    'string.min': 'Tên shop phải có ít nhất 3 ký tự',
    'string.max': 'Tên shop không được vượt quá 50 ký tự',
  }),
  idWarehouse: joi
    .string()
    .required()
    .custom((value, helper) => {
      if (!mongoose.Types.ObjectId.isValid(value))
        return helper.message('Mã kho hàng không hợp lệ!');
      if (!warehouseService.getWarehouse(value))
        return helper.message('Kho hàng không tồn tại');
    }),
  Images: joi.array().items(
    joi.object({
      url: joi.string().uri(),
      public_id: joi.string(),
    }),
  ),
  status: joi.boolean(),
});
