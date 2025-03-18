import express from 'express';
import orderDetailRoutes from '../routes/orderDetail.routes.js';
import deliveryInformationRoutes from '../routes/deliveryInformation.routes.js';

const router = express.Router();

const rootRoutes = [orderDetailRoutes, deliveryInformationRoutes];
rootRoutes.map((route) => {
	router.use(route);
});
export default rootRoutes;
