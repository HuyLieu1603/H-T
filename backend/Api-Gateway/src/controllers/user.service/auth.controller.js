import axios from 'axios';
import config from '../../config.js';
import { HTTP_STATUS } from '../../common/http-status.common.js';
import * as dotenv from 'dotenv';

dotenv.config();

export const authController = {
  //Login for user
  login: async (req, res) => {
    const body = req.body;
    const result = await axios.post(
      `${process.env.USER_SERVICE_URL}/login`,
      body,
      config,
    );
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Đăng nhập thất bại',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Đăng nhập thành công',
      sucess: true,
      data: result.data,
    });
  },
  //Register for customer
  register: async (req, res) => {
    const body = req.body;
    const result = await axios.post(
      `${process.env.USER_SERVICE_URL}/register`,
      body,
      config,
    );
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Đăng ký thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Đăng ký thành công',
      success: true,
      data: result.data,
    });
  },
  //Change password for user
  changePassword: async (req, res) => {
    const { idUser } = req.params;
    const data = req.body;

    const result = await axios.put(
      `${process.env.USER_SERVICE_URL}/change-password/${idUser}`,
      data,
      config,
    );
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Đổi mật khẩu thất bại!',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Đổi mật khẩu thành công!',
      success: true,
      data: result.data,
    });
  },
};
