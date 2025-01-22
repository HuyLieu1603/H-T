import express from 'express';
import categoryRoutes from '../routes/category.routes.js';
import warehouseRoutes from '../routes/warehouse.routes.js';
import shopRoutes from '../routes/shop.routes.js';
import productRoutes from '../routes/product.routes.js';
import cartRoutes from '../routes/cart.routes.js';
const router = express.Router();

const rootRoutes = [
  cartRoutes,
  productRoutes,
  categoryRoutes,
  warehouseRoutes,
  shopRoutes,
];
rootRoutes.map((route) => {
  router.use(route);
});
export default rootRoutes;
