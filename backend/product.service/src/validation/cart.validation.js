import joi from 'joi';

export const cartValidation = joi.object({
  id_user: joi.string().required(),
  list_product: joi.array().items(
    joi.object({
      id_product: joi.string(),
      quantity: joi.number(),
      total: joi.number(),
    }),
  ),
});
