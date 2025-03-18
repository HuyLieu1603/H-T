import { deliveryInformationValidation } from '../validations/deliveryInformation.validation.js';
import { HTTP_STATUS } from '../../../product.service/src/common/http-status.common.js';

export const deliveryInformationMiddleware = async (req, res, next) => {
	const body = req.body;
	//validate
	const { error } = deliveryInformationValidation.validate(body, {
		abortEarly: false,
	});
	if (error) {
		const errors = error.details.map((item) => item.message);
		return res.status(HTTP_STATUS.BAD_REQUEST).json({
			message: errors,
			success: false,
		});
	}
	next();
};
