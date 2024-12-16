import axios from 'axios';
import config from '../../../config.js';
import { HTTP_STATUS } from '../../../common/http-status.common.js';
export const shopController = {
  createShop: async (req, res) => {
    const body = req.body;
    const shop = await axios.post(
      `${process.env.PRODUCT_SERVICE_URL}/shop`,
      body,
      config,
    );
    if (!shop)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Không thể tạo cửa hàng',
        success: false,
      });
    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Tạo cửa hàng mới thành công!',
      success: true,
      data: shop.data,
    });
  },
  //get shop by id
  getShopById: async (req, res) => {
    const { idShop } = req.params;
    //get shop
    const result = await axios(
      `${process.env.PRODUCT_SERVICE_URL}/shop/${idShop}`,
    );
    //check
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Không tìm thấy shop',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Tải thông tin shop thành công!',
      success: true,
      data: result.data,
    });
  },
  //fetch list shop
  fetchListShop: async (req, res) => {
    //fetch
    const result = await axios(`${process.env.PRODUCT_SERVICE_URL}/list-shop`);
    //check
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Tải danh sách thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Tải danh sách thành công!',
      success: true,
      data: result.data,
    });
  },
  //update shop by id
  updateShopById: async (req, res) => {
    //get id
    const { idShop } = req.params;
    //get data from body
    const data = req.body;
    //update
    const result = await axios.put(
      `${process.env.PRODUCT_SERVICE_URL}/shop/${idShop}`,
      data,
      config,
    );
    //check and return result
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Cập nhật cửa hàng thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Cập nhật cửa hàng thành công nè!',
      success: true,
    });
  },
  //update status shop
  updateStatusShop: async (req, res) => {
    const { idShop } = req.params;
    const { status } = req.body;
    const result = await axios.put(
      `${process.env.PRODUCT_SERVICE_URL}/shop-status/${idShop}`,
      { status },
      config,
    );

    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Cập nhật trạng thái thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: result.data,
    });
  },
};
