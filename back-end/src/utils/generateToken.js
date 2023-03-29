require('dotenv').config();

const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

module.exports = (email) => jwt.sign({ email }, secret, jwtConfig);