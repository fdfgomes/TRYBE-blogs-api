const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (data) => jwt.sign({ data }, secret, jwtConfig);

const validateToken = (token) =>
  jwt.verify(token, secret, (_err, decoded) => {
    if (!decoded) {
      return null;
    }
    return decoded;
  });

module.exports = { createToken, validateToken };
