import axios from 'axios';
import { HTTP_STATUS } from '../../common/http-status.common.js';

export const userController = {
  //Fetch list user
  fetchListUser: async (req, res) => {
    const result = await axios.get(
      `${process.env.USER_SERVICE_URL}/fetch-list-user`,
    );
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Tải dữ liệu thất bại!',
        sucess: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Tải dữ liệu thành công!',
      sucess: true,
      data: result.data,
    });
  },
  //Get user by id
  getUserById: async (req, res) => {
    const { idUser } = req.params;
    const result = await axios.get(
      `${process.env.USER_SERVICE_URL}/get-user/${idUser}`,
    );
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Không thể tải dữ liệu người dùng!',
        sucess: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Tải dữ liệu người dùng thành công!',
      sucess: true,
      data: result.data,
    });
  },
};
