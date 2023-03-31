const { Product } = require('../database/models');

const getProducts = async () => {
  const products = await Product.findAll();
  return products;
};

const addProduct = async ({ name, price, urlImage }) => {
  const addedProduct = await Product.create({ name, price, urlImage });
  return addedProduct;
};

module.exports = {
  getProducts,
  addProduct,
};
