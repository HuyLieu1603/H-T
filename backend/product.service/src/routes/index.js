import express from 'express';
import categoryRoutes from '../routes/category.routes.js';
import cartRouteres from '../routes/cart.routes.js';
import productRoutes from '../routes/product.routes.js';

const router = express.Router();

//const rootRoutes = [categoryRoutes];
const rootRoutes = [cartRouteres];

//const rootRoutes = [productRoutes];

rootRoutes.map((route) => {
  router.use(route);
});
export default rootRoutes;
