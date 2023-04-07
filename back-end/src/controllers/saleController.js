const saleService = require('../services/saleService');

const addSale = async (req, res, next) => {
  try {
    const newSale = await saleService.addSale(req.body);
    res.status(201).json({ sale: newSale });
  } catch (error) {
    next(error);
  }
};

const getSales = async (req, res, next) => {
  const { id } = req.params;
  try {
   const sales = await saleService.getSales(id);
   res.status(200).json({ sales });
  } catch (error) {
    next(error);
  }
};

const getSellerSales = async (req, res, next) => {
  const { id } = req.params;
  // res.status(200).json({ message: 'teste' });
  
  try {
   const sales = await saleService.getSellerSales(id);
   res.status(200).json({ sales });
  } catch (error) {
    next(error);
  }
};
const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
  
    await saleService.updateStatus(id, status);
    res.status(204).json({ message: 'ok' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addSale,
  getSales,
  getSellerSales,
  updateStatus,
};
