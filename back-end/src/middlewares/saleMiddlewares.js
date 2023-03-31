const { validateUser } = require('./userMiddlewares');

const verifyParams = (req, res, next) => {
  const {
    totalPrice, deliveryAddress, deliveryNumber, status, userId, sellerId, products,
  } = req.body;
  const allParams = [
    totalPrice, deliveryAddress, deliveryNumber, status, userId, sellerId, products,
  ];
  if (allParams.some((param) => !param)) {
    return res.status(412).json({ message: 'Some fields are missing' });
  }
  next();
};

const verifyUsers = async (req, res, next) => {
  const sellerUser = await validateUser(req.body.sellerId);
  if (!sellerUser) {
    return res.status(401).json({ message: 'Seller is not a valid user' });
  }

  const customerUser = await validateUser(req.body.userId);
  if (!customerUser) {
    return res.status(401).json({ message: 'Customer is not a valid user' });
  }
  next();
};

module.exports = {
  verifyParams,
  verifyUsers,
};
