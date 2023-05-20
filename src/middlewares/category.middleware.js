const RESPONSE_TYPES = require('../constants/RESPONSE_TYPES');

const validateName = (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(RESPONSE_TYPES.BAD_REQUEST).json({
        message: '"name" is required',
      });
    }
  } catch (err) {
    return res
      .status(RESPONSE_TYPES.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }

  next();
};

module.exports = {
  validateName,
};
