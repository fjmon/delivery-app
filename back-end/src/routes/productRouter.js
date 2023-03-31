const express = require('express');
const productController = require('../controllers/productController');

const productRouter = express.Router();

productRouter.get(
  '/',
  productController.getProducts,
);

productRouter.post(
  '/',
  productController.addProduct,
);

module.exports = productRouter;
