import userRoutes from '../routes/user.routes.js';
import shopRoutes from '../routes/shop.routes.js';
import categoryRoutes from '../routes/category.routes.js';
import warehouseRoutes from '../routes/warehouse.routes.js';
import express from 'express';

const router = express.Router();

const rootRoutes = [userRoutes, shopRoutes, categoryRoutes, warehouseRoutes];

rootRoutes.map((route) => {
  router.use(route);
});

export default router;
