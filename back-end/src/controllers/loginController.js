const generateToken = require('../utils/generateToken');

const login = (req, res) => {
  const { user } = res.locals;
  
  res.status(200).json({ user: { ...user, token: generateToken(user.email) } });
};

module.exports = {
  login,
};
