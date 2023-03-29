const express = require('express');
const loginController = require('../controllers/loginController');

const userMiddlewares = require('../middlewares/userMiddlewares');

const loginRouter = express.Router();

loginRouter.post(
  '/',
  userMiddlewares.validateEmail,
  userMiddlewares.validatePassword,
  userMiddlewares.validateUserExist,
  loginController.login,
);

module.exports = loginRouter;
