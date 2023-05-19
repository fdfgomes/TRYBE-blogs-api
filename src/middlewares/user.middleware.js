const RESPONSE_TYPES = require('../constants/RESPONSE_TYPES');

const MIN_DISPLAY_NAME_LENGTH = 8;
const MIN_PASSWORD_LENGTH = 6;

const isValid = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const validateDisplayName = (req, res, next) => {
  try {
    const { displayName } = req.body;

    if (!displayName || displayName.length < MIN_DISPLAY_NAME_LENGTH) {
      return res.status(RESPONSE_TYPES.BAD_REQUEST).json({
        message: '"displayName" length must be at least 8 characters long',
      });
    }
  } catch (err) {
    return res
      .status(RESPONSE_TYPES.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }

  next();
};

const validateEmail = (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || !isValid(email)) {
      return res.status(RESPONSE_TYPES.BAD_REQUEST).json({
        message: '"email" must be a valid email',
      });
    }
  } catch (err) {
    return res
      .status(RESPONSE_TYPES.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }

  next();
};

const validatePassword = (req, res, next) => {
  try {
    const { password } = req.body;

    if (!password || password.length < MIN_PASSWORD_LENGTH) {
      return res.status(RESPONSE_TYPES.BAD_REQUEST).json({
        message: '"password" length must be at least 6 characters long',
      });
    }
  } catch (err) {
    return res
      .status(RESPONSE_TYPES.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }

  next();
};

const validateImage = (req, res, next) => {
  try {
    const { image } = req.body;

    if (!image) {
      req.body.image = null;
    }
  } catch (err) {
    return res
      .status(RESPONSE_TYPES.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }

  next();
};

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
  validateImage,
};
