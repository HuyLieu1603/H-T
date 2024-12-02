import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema(
  {
    nameProduct: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    idCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    desc: {
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
      type: String,
      enum: ['Sẵn Sàng', 'Không sẵn sàng'],
      default: 'Sẵn sàng',
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

productSchema.plugin(mongoosePaginate);
const product = mongoose.model('Product', productSchema);
export default product;
