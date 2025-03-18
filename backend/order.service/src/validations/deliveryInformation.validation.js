import joi from 'joi';

export const deliveryInformationValidation = joi.object({
  idCustomer: joi.string().required().messages({
    'string.empty': 'Mã khách hàng không được để trống',
    'any.required': 'Mã khách hàng không được để trống',
  }),
  nameCustomer: joi.string().required().messages({
    'string.empty': 'Tên người nhận không được để trống',
    'any.required': 'Tên người nhận không được để trống',
  }),
  address: joi.string().empty().messages({
    'string.empty': 'Địa chỉ giao hàng không được để trống',
    'any.required': 'Địa chỉ giao hàng không được để trống',
  }),
  phone: joi.string().required().messages({
    'string.empty': 'Số điện thoại người nhận không được để trống',
    'any.required': 'Số điện thoại người nhận không được để trống',
  }),
  note: joi.string(),
});



