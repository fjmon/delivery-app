const { Sale, SaleProduct } = require('../database/models');

const addSale = async ({ 
  totalPrice, deliveryAddress, deliveryNumber, saleDate, status, userId, sellerId, products,
 }) => {
  const newSale = await Sale.create({
    totalPrice, deliveryAddress, deliveryNumber, saleDate, status, userId, sellerId,
  });
  const promiseSaleProduct = products.map(async (product) => {
    await SaleProduct.create({ saleId: newSale.id, productId: product[0], quantity: product[1] });
  });
  await Promise.all(promiseSaleProduct);
  const addedSale = await Sale.findByPk(newSale.id);
  return addedSale;
};

module.exports = {
  addSale,
};
