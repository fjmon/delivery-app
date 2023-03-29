const express = require('express');
const loginController = require('../controllers/loginController');

const loginMiddlewares = require('../middlewares/loginMiddlewares');

const loginRouter = express.Router();

loginRouter.post(
  '/',
  loginMiddlewares.validateEmail,
  loginMiddlewares.validatePassword,
  loginMiddlewares.validateUser,
  loginController.login,
);

module.exports = loginRouter;
