import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const warehouseSchema = new mongoose.Model({
  nameWarehouse: {
    type: String,
    required: true,
  },
  listProduct: [
    {
      idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  listCategory: [
    {
      idCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    },
  ],
  status: {
    type: Boolean,
    required: true,
  },
});
