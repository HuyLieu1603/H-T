import express from 'express';
import { deliveryInformationController } from '../controllers/deliveryInformation.controller.js';
import { deliveryInformationMiddleware } from '../middlewares/deliveryInformation.middleware.js';
import { wrapRequestHandler } from '../../../product.service/src/utils/handle.util.js';
import { verifyToken } from '../../../product.service/src/middlewares/verify-token.middleware.js';

const router = express.Router();

//CREATE
router.post(
	'/delivery-information',
	wrapRequestHandler(verifyToken),
	wrapRequestHandler(deliveryInformationMiddleware),
	wrapRequestHandler(deliveryInformationController.createDeliveryInformation),
);
//UPDATE
router.put(
	'/delivery-information',
	wrapRequestHandler(verifyToken),
	wrapRequestHandler(deliveryInformationMiddleware),
	wrapRequestHandler(deliveryInformationController.updateDeliveryInforById),
);
//GET DETAIL

//GET LIST
