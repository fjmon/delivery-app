const md5 = require('md5');
const { User } = require('../database/models');

const validateEmail = (req, res, next) => {
  const { email } = req.body; 
  const vEmail = /^\S+@\S+\.\S+$/;
  if (!email || !vEmail.test(email)) res.status(400).json({ message: 'Invalid email' });
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: 'Name is required' });
  }
  if (name.length <= 12) {
    return res.status(400).json({ message: 'Name must be greater than or equal to 12 characters' });
  }
  next();
};

const validateUserExist = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  const hashedPassword = md5(password);

  if (!user || hashedPassword !== user.password) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.locals.user = {
    id: user.id, 
    name: user.name, 
    email: user.email, 
    role: user.role, 
  };

  next();
};

const validateUserNotExist = async (req, res, next) => {
  const { email, name } = req.body;

  // verifica se já existe uma pessoa com o email
  const findUserByEmail = await User.findOne({ where: { email } });
  if (findUserByEmail) {
    return res.status(409).json({ message: 'User email already exist' });
  }

  // verifica se ja existe uma pessoa com o nome
  const findUserByName = await User.findOne({ where: { name } });
  if (findUserByName) {
    return res.status(409).json({ message: 'User name already exist' });
  }

  next();
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateUserExist,
  validateUserNotExist,
};
