require('dotenv').config();

const jwt = require('jsonwebtoken');
const getSecret = require('./getSecret');

const secret = getSecret();

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

module.exports = (email) => jwt.sign({ email }, secret, jwtConfig);