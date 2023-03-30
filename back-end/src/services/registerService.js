const md5 = require('md5');
const { User } = require('../database/models');

const register = async ({ name, email, password }) => {
  const user = await User.create({ name, email, password: md5(password) });
  return user;
};

module.exports = {
  register,
};
