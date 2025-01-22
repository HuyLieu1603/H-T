import Joi from 'joi';
import mongoose from 'mongoose';

export const cartValidation = Joi.object({
  id_user: Joi.string()
    .required()
    .custom(async (value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value))
        return helpers.message('Mã người dùng không hợp lệ');
    }),
  list_product: Joi.array().items(
    Joi.ObjectId({
      id_product: Joi.string()
        .required()
        .custom(async (value, helpers) => {
          if (!mongoose.Types.ObjectId.isValid(value))
            return helpers.message('Mã sản phẩm không hợp lệ!');
        }),
      quantity: Joi.number().default(1).required().messages({}),
    }),
  ),
});
