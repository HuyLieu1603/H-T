import { warehouseValidation } from '../validation/warehouse.validation.js';
import { HTTP_STATUS } from '../common/http-status.common.js';

export const warehouseMiddleware = async (req, res, next) => {
  const body = req.body;
  console.log(body);
  //validate
  const { error } = warehouseValidation.validate(body, { abortEarly: false });
  if (error) {
    const listError = error.details.map((item) => item.message);
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: listError,
      success: false,
    });
  }
  next();
};
