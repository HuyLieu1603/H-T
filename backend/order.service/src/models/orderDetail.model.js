import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const orderDetailSchema = new mongoose.Schema(
	{
		idCustomer: {
			type: String,
			required: true,
		},
		listProduct: [
			{
				idProduct: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
			},
		],
		total: {
			type: Number,
			required: true,
		},
		idDeliveryInfor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'deliveryInfor',
			required: true,
		},
		statusOrder: {
			type: String,
			enum: [
				'Đã xác nhận',
				'Đã hủy',
				'Đã hoàn thành',
				'Đang giao hàng',
				'Chờ xác nhận',
			],
			default: 'Chờ xác nhận',
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

orderDetailSchema.plugin(mongoosePaginate);
const orderDetail = mongoose.model('OrderDetail', orderDetailSchema);
export default orderDetail;
