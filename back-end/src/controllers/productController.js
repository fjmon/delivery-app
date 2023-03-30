const productService = require('../services/productService');

const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getProducts();
    res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
};
