import { orderDetailService } from '../services/orderDetail.service.js';
import { HTTP_STATUS } from '../common/http-status.common.js';

export const orderDetailController = {
	//create orderDetail
	createOrderDetail: async (req, res) => {
		const data = req.body;
		const newOrderDetail = await orderDetailService.createOrderDetail(data);
		if (!newOrderDetail)
			return res.status(HTTP_STATUS.BAD_REQUEST).json({
				message: 'Tạo đơn hàng mới thất bại',
				success: false,
			});
		return res.status(HTTP_STATUS.OK).json({
			message: 'Tạo đơn hàng mới thành công',
			success: true,
			data: newOrderDetail,
		});
	},

	//add product to order detail
	addProductToOrderDetail: async (req, res) => {
		const { _id, listProduct } = req.body;

		const result = await orderDetailService.addProductToOrder(_id, listProduct);
		if (!result)
			return res.status(HTTP.BAD_REQUEST).json({
				message: 'Thêm sản phẩm thất bại',
				success: false,
			});
		return res.status(HTTP_STATUS.OK).json({
			message: 'Thêm sản phẩm thành công!',
			success: true,
			data: result,
		});
	},

	//edit orderDetail
	editOrderDetailById: async (req, res) => {
		const data = req.body;
		const editOrder = await orderDetailService.editOrderDetail(data);

		if (!editOrder)
			return res.status(HTTP_STATUS.BAD_REQUEST).json({
				message: 'Chỉnh sửa đơn hàng thất bại!',
				success: false,
			});
		return res.status(HTTP_STATUS.OK).json({
			message: 'Chỉnh sửa đơn hàng thành công',
			success: true,
			data: editOrder,
		});
	},

	//get order detail by id
	getOrderDetailById: async (req, res) => {
		const { id } = req.body;
		//GET
		const orderDetail = await orderDetailService.getOrderDetail(id);
		if (!orderDetail)
			return res.status(HTTP_STATUS.BAD_REQUEST).json({
				message: 'Tải dữ liệu đơn hàng thất bại!',
				success: false,
			});
		return res.status(HTTP_STATUS.OK).json({
			message: 'Tải dữ liệu đơn hàng thành công',
			success: true,
			data: orderDetail,
		});
	},

	//fetch list order detail by user
	fetchListOrderDetail: async (req, res) => {
		const { UserId } = req.user;
		//fetch
		const listOrderDetail =
			await orderDetailService.fetchListOrderDetail(UserId);
		if (!listOrderDetail)
			return res.status(HTTP_STATUS.BAD_REQUEST).json({
				message: 'Tải danh sách đơn hàng thất bại!',
				success: false,
			});
		return res.status(HTTP_STATUS.OK).json({
			message: 'Tải danh sách đơn hàng thành công!',
			success: true,
			data: listOrderDetail,
		});
	},

	//edit status order detail
	editStatusOrderDetailById: async (req, res) => {
		const { idOrder, statuOrder } = req.body;

		const newStatus = await orderDetailController.editStatusOrderDetailById(
			idOrder,
			statuOrder,
		);

		if (!newStatus)
			return res.status(HTTP_STATUS.BAD_REQUEST).json({
				message: 'Chỉnh sửa trạng thái đơn hàng thất bại!',
				success: false,
			});
		return res.status(HTTP_STATUS.OK).json({
			message: 'Chỉnh sửa trạng thái đơn hàng thành công!',
			success: true,
			data: newStatus,
		});
	},

	//edit delivery information
	editDeliveryInfor: async (req, res) => {
		const { _id, idDeliveryInfor } = req.body;

		const result = await orderDetailService.editDeliveryInformation(
			_id,
			idDeliveryInfor,
		);
		if (!result)
			return res.status(HTTP_STATUS.BAD_REQUEST).json({
				message: 'Chỉnh sửa địa chỉ giao hàng thất bại!',
				success: false,
			});
		return res.status(HTTP_STATUS.OK).json({
			message: 'Chỉnh sửa địa chỉ giao hàng thành công!',
			success: true,
		});
	},
};
