const express = require('express');
const saleController = require('../controllers/saleController');
const saleMiddlewares = require('../middlewares/saleMiddlewares');

const saleRouter = express.Router();

saleRouter.post(
  '/',
  saleMiddlewares.verifyParams,
  saleMiddlewares.verifyUsers,
  saleController.addSale,
  );

module.exports = saleRouter;
