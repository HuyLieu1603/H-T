import express from 'express';
import { authController } from '../controllers/user.service/auth.controller.js';
import { userController } from '../controllers/user.service/user.controller.js';
import { verifyToken } from '../middlewares/verify-token.middleware.js';
import {
  authorizeRole,
  checkPermission,
} from '../middlewares/check-permission.middleware.js';
import { wrapRequestHandler } from '../utils/handle-util.js';

const router = express.Router();

router.post('/login', wrapRequestHandler(authController.login));

router.post('/register', wrapRequestHandler(authController.register));

router.get(
  '/fetch-list-user',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(checkPermission),
  wrapRequestHandler(userController.fetchListUser),
);
//get user by id
router.get(
  '/get-user/:idUser',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(userController.getUserById),
);

//update user by id
router.put(
  '/user/:id',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(userController.updateUserById),
);
export default router;
