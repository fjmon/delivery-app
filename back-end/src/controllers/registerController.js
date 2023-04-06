const generateToken = require('../utils/generateToken');
const registerService = require('../services/registerService');

const register = async (req, res, next) => {
  try {
    const user = await registerService.register(req.body);
    res.status(201).json({ user, token: generateToken(user.email) });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
};
