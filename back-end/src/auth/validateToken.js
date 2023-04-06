const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const getSecret = require('../utils/getSecret');
require('dotenv/config');

const secret = getSecret();

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token || token.legth === 0) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const { email } = jwt.verify(token, secret);
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};