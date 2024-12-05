import { HTTP_STATUS } from '../common/http-status.common.js';
import { cartValidation } from '../validation/cart.validation.js';

export const cartMiddleware = async (req, res, next) => {
  const body = req.body;

  //validate
  const { error } = cartValidation.validate(body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((item) => item.message);
    console.log(errors.details);
    console.log(1);
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: errors,
      success: false,
    });
  }
  next();
};
