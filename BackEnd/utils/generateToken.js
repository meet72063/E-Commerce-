const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JSON_SECRET);
};

module.exports = { generateToken };
