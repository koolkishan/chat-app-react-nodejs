const jwt = require("jsonwebtoken");

const verfiyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = verfiyToken;
