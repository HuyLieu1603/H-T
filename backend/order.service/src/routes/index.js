import express from 'express';
import orderDetailRoutes from '../routes/orderDetail.routes.js';

const router = express.Router();

const rootRoutes = [orderDetailRoutes];
rootRoutes.map((route) => {
  router.use(route);
});
export default rootRoutes;
