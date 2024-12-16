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
    console.log('Response data:', result.data);
    console.log('Response headers:', result.headers);
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
};
