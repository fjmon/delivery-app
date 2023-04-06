const { Product, SaleProduct } = require('../database/models');

const getProducts = async () => {
  const products = await Product.findAll();
  return products;
};

const addProduct = async ({ name, price, urlImage }) => {
  const addedProduct = await Product.create({ name, price, urlImage });
  return addedProduct;
};

const getProductBySale = async (id) => {
  const listOfId = await SaleProduct.findAll({ where: { saleId: id } });
  const promisseProducts = listOfId.map(async (sale) => {
    const { dataValues } = await Product.findByPk(sale.productId);
    return { quantity: sale.quantity, ...dataValues };
  });
  const product = await Promise.all(promisseProducts);
  return product;
};

module.exports = {
  getProducts,
  addProduct,
  getProductBySale,
};
