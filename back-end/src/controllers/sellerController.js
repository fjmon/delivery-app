const sellerService = require('../services/sellerService');

const getSellers = async (req, res, next) => {
  try {
    const sellers = await sellerService.getSellers();
    res.status(200).json(sellers);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSellers,
};
