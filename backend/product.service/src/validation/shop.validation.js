import joi from 'joi';


export const shopValidation = joi.object({
  nameShop: joi.string().min(3).max(50).required().messages({
    'string.empty': 'Tên shop không được để trống',
    'any.required': 'Tên shop không được để trống',
    'string.min': 'Tên shop phải có ít nhất 3 ký tự',
    'string.max': 'Tên shop không được vượt quá 50 ký tự',
  }),
  desc: joi.string().max(500),
  Images: joi.array().items(
    joi.object({
      url: joi.string().uri(),
      public_id: joi.string(),
    }),
  ),
  status: joi.boolean(),
});
