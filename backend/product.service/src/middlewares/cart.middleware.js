import { HTTP_STATUS } from '../common/http-status.common.js';
import { cartValidation } from '../validation/cart.validation.js';
import product from '../models/product.model.js'; // Đảm bảo đường dẫn đúng đến mô hình Product

export const cartMiddleware = async (req, res, next) => {
  const body = req.body;

  // Validate
  const { error } = cartValidation.validate(body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((item) => item.message);
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: errors,
      success: false,
    });
  }

  

  next();
};
