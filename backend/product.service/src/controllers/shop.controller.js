import { shopService } from '../service/shop.service.js';
import { HTTP_STATUS } from '../common/http-status.common.js';
import { warehouseService } from '../service/warehouse.service.js';

export const shopController = {
  //Create new shop
  createShop: async (req, res) => {
    const body = req.body;
    const newShop = await shopService.createNewShop(body);
    if (!newShop)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Tạo cửa hàng thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Tạo cửa hàng thành công!',
      success: true,
      data: newShop,
    });
  },
  //Get shop's information
  getShopById: async (req, res) => {
    const { idShop } = req.params;
    //GET
    const detailShop = await shopService.getShopById(idShop);
    if (!detailShop)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Không tìm thấy cửa hàng!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Tải cửa hàng thành công!',
      success: true,
      data: detailShop,
    });
  },
  //Fetch list shop
  fetchListShop: async (req, res) => {
    //FETCH
    const listShop = await shopService.fetchListShop();
    if (!listShop)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Tải danh sách cửa hàng thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Tải danh sách cửa hàng thành công!',
      success: true,
      data: listShop,
    });
  },
  //Update shop
  updateShopById: async (req, res) => {
    const { idShop } = req.params;
    const body = req.body;
    //UPDATE
    const result = await shopService.updateShopById(idShop, body);
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Cập nhật cửa hàng thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Cập nhật cửa hàng thành công!',
      success: true,
    });
  },
  //update status shop
  updateStatusShop: async (req, res) => {
    const { status } = req.body;
    const { idShop } = req.params;
    //update status
    const result = await shopService.updateStatusShop(idShop, status);
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Cập nhật trạng thái thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Cập nhật trạng thái thành công!',
      success: true,
    });
  },
  //Delete shop
  deleteShopById: async (req, res) => {
    const { idShop } = req.params;

    //check relationship
    const isExist = await warehouseService.checkWarehouseInShop(idShop);
    if (!isExist)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Không thể xóa vì có dữ liệu bên bảng khác!',
        success: false,
      });

    //DELETE
    const result = await shopService.deleteShop(idShop);
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Xóa cửa hàng thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Xóa cửa hàng thành công!',
      success: true,
    });
  },
};
