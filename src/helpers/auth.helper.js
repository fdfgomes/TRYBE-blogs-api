const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (data) => jwt.sign({ data }, secret, jwtConfig);

const validateToken = (token) => jwt.verify(token, secret);

module.exports = { createToken, validateToken };
