import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const warehouseSchema = new mongoose.Schema(
  {
    nameWarehouse: {
      type: String,
      required: true,
    },
    listCategory: [
      {
        idCategory: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category',
          required: true,
        },
        default: [],
      },
    ],
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
    versionkey: false,
  },
);

warehouseSchema.plugin(mongoosePaginate);
const warehouse = mongoose.model('Warehouse', warehouseSchema, 'Warehouse');
export default warehouse;
