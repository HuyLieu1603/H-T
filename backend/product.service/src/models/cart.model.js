import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const cartSchema = new mongoose.Schema(
  {
    id_user: {
      type: String,
      required: true,
    },
    list_product: [
      {
        id_product: {
          type: mongoose.Schema.Types.ObjectId, // Tham chiếu đến ObjectId
          ref: 'Product',
          require: true,
        },
        quantity: {
          type: mongoose.Schema.Types.Number,
          ref: 'Product',
          require: true,
        },
        total: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

cartSchema.plugin(mongoosePaginate);

const cart = mongoose.model('Cart', cartSchema, 'Cart');
export default cart;
