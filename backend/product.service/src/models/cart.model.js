import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const cartSchema = new mongoose.Schema({
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  list_product: [
    {
      id_product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
});

cartSchema.plugin(mongoosePaginate);
const cart = mongoose.model('cart', cartSchema, 'cart');
export default cart;
