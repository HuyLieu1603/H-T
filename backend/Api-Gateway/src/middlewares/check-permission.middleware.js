import { HTTP_STATUS } from '../common/http-status.common.js';
import { TypeRole } from '../common/type.common.js';

export const checkPermission = (req, res, next) => {
  const { user } = req;
  //check permission
  switch (user.idRole) {
    case TypeRole.ADMIN:
      req.permission = TypeRole.ADMIN;
      break;
    case TypeRole.Businesspanert:
      req.permission = TypeRole.Businesspanert;
      break;
    case TypeRole.CUSTOMER:
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
    if (req.user.idRole !== role) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        message: 'Không có quyền!',
        success: false,
      });
    }
    next();
  };
};
