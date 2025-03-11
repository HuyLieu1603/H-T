import deliveryInfor from '../models/deliveryInfor.model.js';

export const deliveryInformation = {
  //CREATE delivery
  createDelivery: async (data) => {
    return await deliveryInfor.create(data);
  },
  //Get delivery by _id
  getDeliveryById: async (id) => {
    return await deliveryInfor.findById(id);
  },
  //Get list delivery by id user
  getListDeliveryByUser: async (idCustomer) => {
    return await deliveryInfor.find({ idCustomer: idCustomer });
  },
  //Edit delivery by id
  updateDeliveryById: async (id, data) => {
    return await deliveryInfor.findByIdAndUpdate(id, data, { new: true });
  },
  //Delete delivery by id
  deleteDeliveryById: async (id) => {
    return await deliveryInfor.findByIdAndDelete(id);
  },
};
