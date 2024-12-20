import userRoutes from '../routes/user.routes.js';
import shopRoutes from '../routes/shop.routes.js';
import categoryRoutes from '../routes/category.routes.js';
import warehouseRoutes from '../routes/warehouse.routes.js';
import cartRoutes from '../routes/cart.routes.js';
import express from 'express';

const router = express.Router();

const rootRoutes = [
  userRoutes,
  shopRoutes,
  categoryRoutes,
  warehouseRoutes,
  cartRoutes,
];

rootRoutes.map((route) => {
  router.use(route);
});

export default router;
