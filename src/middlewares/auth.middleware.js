const RESPONSE_TYPES = require('../constants/RESPONSE_TYPES');

const validateReceivedProperties = (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(RESPONSE_TYPES.BAD_REQUEST)
        .json({ message: 'Some required fields are missing' });
    }
  } catch (err) {
    return res
      .status(RESPONSE_TYPES.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }

  next();
};

module.exports = {
  validateReceivedProperties,
};
