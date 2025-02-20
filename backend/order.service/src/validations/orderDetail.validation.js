import joi from 'joi';
import mongoose from 'mongoose';
import product from '../../../product.service/src/models/product.model';

export const orderDetailValidation = joi.object({
  idCustomer: joi.string().required().messages({
    'string.empty': 'Mã khách hàng không được để trống',
    'any.required': 'Mã khách hàng không được để trống',
  }),
  listProduct: joi.array().items(
    joi.object({
      idProduct: joi
        .string()
        .required()
        .custom((value, helper) => {
          if (!mongoose.Types.ObjectId.isValid(value))
            return helper.message('Mã sản phẩm không hợp lệ!');
          if (!product.findById(value))
            return helper.message('Sản phẩm không tồn tại!');
        }),
    }),
  ),
  total: joi.number().required().messages({
    'number.base': 'Tổng tiền phải là một số',
    'any.required': 'Tổng tiền không được trống',
  }),
});
