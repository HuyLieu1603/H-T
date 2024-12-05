import express from 'express';
import categoryRoutes from '../routes/category.routes.js';
import cartRouteres from '../routes/cart.routes.js';

const router = express.Router();

//const rootRoutes = [categoryRoutes];
/*
rootRoutes.map((route) => {
  router.use(route);
});

export default rootRoutes;
*/
const rootRoutes = [cartRouteres];

rootRoutes.map((route) => {
  router.use(route);
});
export default rootRoutes;
