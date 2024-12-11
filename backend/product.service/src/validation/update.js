import mongoose from 'mongoose';
import warehouse from '../models/warehouse.model.js'; // Giả sử bạn đã định nghĩa model này ở đây
import mongoosePaginate from 'mongoose-paginate-v2';

// Định nghĩa mô hình Warehouse
const Warehouse = mongoose.model(
  'Warehouse',
  new mongoose.Schema({
    nameWarehouse: String,
    idShop: mongoose.Schema.Types.ObjectId,
    listCategory: Array,
    status: Boolean,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  }),
);

async function updateWarehouseIds() {
  try {
    const warehouses = await Warehouse.find(); // Lấy tất cả các kho chứa

    for (const warehouse of warehouses) {
      if (typeof warehouse.idShop === 'string') {
        warehouse.idShop = mongoose.Types.ObjectId(warehouse.idShop); // Chuyển đổi sang ObjectId
        await warehouse.save(); // Lưu lại sự thay đổi
      }
    }

    console.log('Updated all warehouses with ObjectId for idShop');
  } catch (error) {
    console.error('Error updating warehouses:', error);
  } finally {
    mongoose.connection.close(); // Đóng kết nối
  }
}

// Gọi hàm cập nhật
updateWarehouseIds();
db.warehouses
  .find({ idShop: { $type: 'string' } })
  .forEach(function (warehouse) {
    db.warehouses.updateOne(
      { _id: warehouse._id },
      { $set: { idShop: ObjectId(warehouse.idShop) } },
    );
  });
