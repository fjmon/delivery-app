const express = require('express');
const saleController = require('../controllers/saleController');
const saleMiddlewares = require('../middlewares/saleMiddlewares');
const validateToken = require('../auth/validateToken');

const saleRouter = express.Router();

saleRouter.post(
  '/',
  validateToken,
  saleMiddlewares.verifyParams,
  saleMiddlewares.verifyUsers,
  saleController.addSale,
);

saleRouter.get('/:id', saleController.getSales);

saleRouter.get('/seller/:id', saleController.getSellerSales);

saleRouter.put('/:id', saleController.updateStatus);

module.exports = saleRouter;
