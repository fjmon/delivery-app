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

module.exports = saleRouter;
