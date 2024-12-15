import { HTTP_STATUS } from '../common/http-status.common.js';
import { TypeRole } from '../common/type.common.js';

export const checkPermission = (req, res, next) => {
  const { user } = req;
  //check permission
  switch (user.role) {
    case TypeRole.ADMIN:
      req.permission = TypeRole.ADMIN;
      break;
    case TypeRole.STAFF:
      req.permission = TypeRole.BUSINESS;
      break;
    case TypeRole.USER:
    default:
      return res.status(403).json({
        message: 'Không có quyền truy cập',
        success: false,
      });
  }
  next();
};

export const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        message: 'Không có quyền!',
        success: false,
      });
    }
    next();
  };
};
