import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const orderSchema = new mongoose.Schema(
  {
    idCustomer: {
      type: String,
      required: true,
    },
    id_deliveryInfor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DeliveryInformation',
      required: true,
    },
    listOrderDetail: [
      {
        idOrderDetail: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'OrderDetail',
          required: true,
        },
      },
    ],
    total: {
      type: Number,
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
    is_deleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

orderSchema.plugin(mongoosePaginate);
const order = mongoose.model('Order', orderSchema);
export default order;
