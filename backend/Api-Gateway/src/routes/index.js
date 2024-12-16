import userRoutes from '../routes/user.routes.js';
import shopRoutes from '../routes/shop.routes.js';
import express from 'express';

const router = express.Router();

const rootRoutes = [userRoutes, shopRoutes];

rootRoutes.map((route) => {
  router.use(route);
});

export default router;
