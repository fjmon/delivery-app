require('dotenv').config();

const jwt = require('jsonwebtoken');

// const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

const fs = require('fs');

const secret = fs.readFileSync('jwt.evaluation.key');
const cleanSecret = String(secret).replace(/\s+/, '');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

module.exports = (email) => jwt.sign({ email }, cleanSecret, jwtConfig);