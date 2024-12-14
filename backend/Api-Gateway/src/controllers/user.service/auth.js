import express from 'express';
import axios, { HttpStatusCode } from 'axios';
import { userServiceUrl } from '../../config';
import { HTTP_STATUS } from '../../common/http-status.common.js';

export const UserController = {
  login: async (req, res) => {
    const body = req.body;
    const result = await axios.post(`${userServiceUrl}/login`, body);
    if (!result)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Đăng nhập thất bại',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Đăng nhập thành công',
      sucess: true,
    });
  },
  register: async (req, res) => {
    const result = await axios.get;
  },
};
