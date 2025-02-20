import order from '../models/order.model.js';
import orderDetail from '../models/orderDetail.model.js';

export const orderDetailService = {
  //create order detail service
  createOrderDetail: async (data) => {
	return await orderDetail.create(data);
  },
  //update status order detail
  updateStatus: async (id, status) => {
	return await orderDetail.findByIdAndUpdate(
	  id,
	  { statusOrder: status },
	  { new: true },
	);
  },
  //fetch list order detail
  fetchListOrderDetail: async (idCustomer) => {
	return await orderDetail.find({ idCustomer: idCustomer });
  },
  //get order detail
  getOrderDetail: async (id) => {
	return await orderDetail.findById(id);
  },
  //delete order detail
  deleteOrderDetail: async (id) => {
	return await orderDetail.findByIdAndDelete(id);
  },
  //edit order detail
  
};
