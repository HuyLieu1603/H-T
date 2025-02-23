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
  //fetch list order detail
  fetchListOrderDetail: async (req, res) => {
    const { UserId } = req.user;
    //fetch
    const listOrderDetail = await orderDetailService.fetchListOrderDetail(
      UserId,
    );
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
};
