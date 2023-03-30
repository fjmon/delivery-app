const fs = require('fs');

module.exports = () => {
  const secret = fs.readFileSync('jwt.evaluation.key');
  return String(secret).replace(/\s+/, '');
};