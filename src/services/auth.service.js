const { User } = require('../models');
const RESPONSE_TYPES = require('../constants/RESPONSE_TYPES');

const authHelpers = require('../helpers/auth.helper');

const response = (type, data, message = '') => ({
  status: type,
  data,
  message,
});

const signIn = async (email, password) => {
  try {
    const user = await User.findOne({
      attributes: {
        exclude: ['password'],
      },
      where: {
        email,
        password,
      },
    });

    if (user) {
      const token = authHelpers.createToken(user);
      return response(RESPONSE_TYPES.OK, { token });
    }

    return response(RESPONSE_TYPES.BAD_REQUEST, null, 'Invalid fields');
  } catch (err) {
    return response(RESPONSE_TYPES.INTERNAL_SERVER_ERROR, null, err.message);
  }
};

module.exports = {
  signIn,
};
