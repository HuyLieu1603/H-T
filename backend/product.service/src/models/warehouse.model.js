import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const warehouseSchema = new mongoose.Model(
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
          required,
        },
      },
    ],
    status: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    versionkey: false,
  },
);

warehouseSchema.plugin(mongoosePaginate);
const warehouse = mongoose.model('Warehouse', warehouseSchema);
export default warehouse;
