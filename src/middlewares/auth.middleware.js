const RESPONSE_TYPES = require('../constants/RESPONSE_TYPES');
const authHelpers = require('../helpers/auth.helper');

const ERROR_MESSAGES = {
  EXPIRED_OR_INVALID_TOKEN: 'Expired or invalid token',
  MISSING_REQUIRED_FIELDS: 'Some required fields are missing',
  TOKEN_NOT_FOUND: 'Token not found',
};

const validateReceivedProperties = (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(RESPONSE_TYPES.BAD_REQUEST)
        .json({ message: ERROR_MESSAGES.MISSING_REQUIRED_FIELDS });
    }
  } catch (err) {
    return res
      .status(RESPONSE_TYPES.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }

  next();
};

const validateToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw new Error(ERROR_MESSAGES.TOKEN_NOT_FOUND);

    const tokenIsValid = authHelpers.validateToken(authorization);

    if (!tokenIsValid) throw new Error(ERROR_MESSAGES.EXPIRED_OR_INVALID_TOKEN);
  } catch (err) {
    const status = [
      ERROR_MESSAGES.TOKEN_NOT_FOUND,
      ERROR_MESSAGES.EXPIRED_OR_INVALID_TOKEN,
    ].includes(err.message)
      ? RESPONSE_TYPES.UNAUTHORIZED
      : RESPONSE_TYPES.INTERNAL_SERVER_ERROR;

    return res.status(status).json({ message: err.message });
  }

  next();
};

module.exports = {
  validateReceivedProperties,
  validateToken,
};
