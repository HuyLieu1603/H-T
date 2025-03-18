import { deliveryInformation } from '../services/deliveryInformation.service.js';
import { HTTP_STATUS } from '../../../product.service/src/common/http-status.common.js';

export const deliveryInformationController = {
  
	//CREATE
	createDeliveryInformation: async (req, res) => {
		const { data } = req.body;

		const newDeliveryInfor = await deliveryInformation.createDelivery(data);
		if (!newDeliveryInfor)
			return res.status(HTTP_STATUS.BAD_REQUEST).json({
				message: 'Thêm địa chỉ giao hàng thất bại!',
				success: false,
			});
		return res.status(HTTP_STATUS.CREATED).json({
			message: 'Thêm địa chỉ giao hàng thành công!',
			success: true,
			data: newDeliveryInfor,
		});
	},
	//FIND BY ID
	getDeliveryInforById: async (req, res) => {
		//get delivery information's id from request body
		const { _id } = req.body;
		//Call function from service
		const getDelivery = await deliveryInformation.getDeliveryById(_id);
		//Check status function and return HTTP STATUS
		if (!getDelivery)
			return res.status(HTTP_STATUS.BAD_REQUEST).json({
				message: 'Tải thông tin địa chỉ giao hàng thất bại. Vui lòng thử lại!',
				success: false,
			});
		return res.status(HTTP_STATUS.OK).json({
			message: 'Tải thông tin địa chỉ giao hàng thành công!',
			success: true,
			data: getDelivery,
		});
	},
	//FIND LIST
	getListDeliveryInforByUser: async (req, res) => {
		const { UserId } = req.user;

		const listDeliveryInformation =
			await deliveryInformation.getListDeliveryByUser(UserId);
		if (!listDeliveryInformation)
			return res.status(HTTP_STATUS.BAD_REQUEST).json({
				message: 'Tải danh sách thất bại. Vui lòng thử lại',
				success: false,
			});
		return res.status(HTTP_STATUS.OK).json({
			message: 'Tải danh sách thành công!',
			success: true,
			data: listDeliveryInformation,
		});
	},
	//UPDATE BY ID
	updateDeliveryInforById: async (req, res) => {
		const { _id } = req.body;

		const checkUpdate = await deliveryInformation.updateDeliveryById(_id);
		if (!checkUpdate)
			return res.status(HTTP_STATUS.BAD_REQUEST).json({
				message: 'Chỉnh sửa địa chỉ giao hàng thất bại!',
				success: false,
			});
		return res.status(HTTP_STATUS.OK).json({
			message: 'Chỉnh sửa địa chỉ giao hàng thành công!',
			success: true,
			data: checkUpdate,
		});
	},
	//DELETE BY ID
	deleteDeliveryInforById: async (req, res) => {
		const { _id } = req.body;

		const checkDelete = await deliveryInformation.deleteDeliveryById(_id);
		if (!checkDelete)
			return res.status(HTTP_STATUS.BAD_REQUEST).json({
				message: 'Xóa địa chỉ giao hàng thất bại. Vui lòng thử lại!',
				success: false,
			});
		return res.status(HTTP_STATUS.OK).json({
			message: 'Xóa địa chỉ giao hàng thành công!',
			success: true,
		});
	},
};
