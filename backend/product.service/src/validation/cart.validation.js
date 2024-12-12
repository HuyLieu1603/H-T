import joi from 'joi';
import mongoose from 'mongoose';
import cart from '../models/cart.model.js';
export const cartValidation = joi.object({
  id_user: joi.string().required(),
  list_product: joi.array().items(
    joi.object({
      id_product: joi
        .string()
        .required()
        .custom((value, helper) => {
          if (!mongoose.Types.ObjectId.isValid(value))
            return helper.message('Mã sản phẩm không hợp lệ');
          if (!cart.findById(value))
            return helper.message('Mã sản phẩm không tồn tại');
        }),
      quantity: joi.number(),
    }),
  ),
  total: joi.number(),
});
