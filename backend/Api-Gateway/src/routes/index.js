import userRoutes from '../routes/user.routes.js';
import express from 'express';

const router = express.Router();

const rootRoutes = [userRoutes];

rootRoutes.map((route) => {
  router.use(route);
});

export default router;
