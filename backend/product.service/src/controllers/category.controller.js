import { HTTP_STATUS } from '../common/http-status.common.js';
import { categoryService } from '../service/category.service.js';

export const categoryController = {
  createCategory: async (req, res) => {
    const body = req.body;
    console.log(body);
    // create
    const newCategory = await categoryService.createCategory(body);
    if (!newCategory)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Tạo danh mục thất bại',
        success: false,
      });

    return res.status(HTTP_STATUS.OK).json({
      message: 'Tạo danh mục thành công!',
      success: true,
      data: newCategory,
    });
  },
};
