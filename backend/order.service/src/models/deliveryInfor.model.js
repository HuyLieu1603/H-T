import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const deliveryInforSchema = new mongoose.Schema({
  nameCustomer: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
});

deliveryInforSchema.plugin(mongoosePaginate);
const deliveryInfor = mongoose.model(
  'DeliveryInformation',
  deliveryInforSchema,
);
export default deliveryInfor;
