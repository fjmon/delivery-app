const productService = require('../services/productService');

const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getProducts();
    res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
};

const addProduct = async (req, res, next) => {
  try {
    const products = await productService.addProduct(req.body);
    res.status(201).json({ products });
  } catch (error) {
    next(error);
  }
};

const getProductBySale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await productService.getProductBySale(id);
    res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  addProduct,
  getProductBySale,
};
