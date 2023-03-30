const express = require('express');
const validateToken = require('../auth/validateToken');

const validateTokenRouter = express.Router();

validateTokenRouter.post(
  '/',
  validateToken,
  (req, res) => res.status(200).json({ message: 'OK' }),
);

module.exports = validateTokenRouter;