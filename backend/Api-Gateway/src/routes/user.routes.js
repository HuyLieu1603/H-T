import express from 'express';
import { UserController } from '../controllers/user.service/auth.controller.js';
import { verifyToken } from '../middlewares/verify-token.middleware.js';
import { checkPermission } from '../middlewares/check-permission.middleware.js';
import { wrapRequestHandler } from '../utils/handle-util.js';

const router = express.Router();

router.post('/login', wrapRequestHandler(UserController.login));

router.post('/register', wrapRequestHandler(UserController.register));

export default router;
