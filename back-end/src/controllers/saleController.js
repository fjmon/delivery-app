const saleService = require('../services/saleService');

const addSale = async (req, res, next) => {
  try {
    const newSale = await saleService.addSale(req.body);
    res.status(201).json({ sale: newSale });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addSale,
};
