import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const shopSchema = new mongoose.Schema(
  {
    nameShop: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    idWarehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'warehouse',
      required: true,
    },
    address: {
      type: String,
    },
    Images: [
      {
        url: {
          type: String,
        },
        public_id: {
          type: String,
        },
      },
    ],
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

shopSchema.plugin(mongoosePaginate);
const shop = mongoose.model('Shop', shopSchema);
export default shop;
