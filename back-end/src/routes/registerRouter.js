const express = require('express');
const registerController = require('../controllers/registerController');

const userMiddlewares = require('../middlewares/userMiddlewares');

const registerRouter = express.Router();

registerRouter.post(
  '/',
  userMiddlewares.validateName,
  userMiddlewares.validateEmail,
  userMiddlewares.validatePassword,
  userMiddlewares.validateUserNotExist,
  registerController.register,
);

module.exports = registerRouter;
