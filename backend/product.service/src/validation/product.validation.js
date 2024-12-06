import joi from 'joi';

export const productValidation = joi.object({
  nameProduct: joi.string().required().messages({
    'string.empty': 'Tên sản phẩm không được để trống',
    'any.required': 'Tên sản phẩm không được để trống',
  }),
  //
  desc: joi.string().optional(),
  price: joi.number().required().messages({
    'number.base': 'Giá phải là một số',
    'any.required': 'Giá không được để trống',
  }),
  idCategory: joi.string(),
  Images: joi.array().items(
    joi.object({
      url: joi.string().uri(),
      public_id: joi.string(),
    }),
  ),
  status: joi.string().valid('Sẵn Sàng', 'Không sẵn sàng').default('Sẵn Sàng'),
  is_deleted: joi.boolean().default(false),
});
