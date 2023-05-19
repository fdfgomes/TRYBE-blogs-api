const { User } = require('../models');
const RESPONSE_TYPES = require('../constants/RESPONSE_TYPES');
const authHelpers = require('../helpers/auth.helper');

const response = (type, data, message = '') => ({
  status: type,
  data,
  message,
});

const create = async (user) => {
  try {
    const { displayName, email, image } = user;

    const createdUser = await User.create({ ...user });

    const { null: id } = createdUser;

    const token = authHelpers.createToken({ id, displayName, email, image });

    return response(RESPONSE_TYPES.CREATED, { token });
  } catch (err) {
    if (err.message === 'Validation error') {
      return response(RESPONSE_TYPES.CONFLICT, null, 'User already registered');
    }
    return response(RESPONSE_TYPES.INTERNAL_SERVER_ERROR, null, err.message);
  }
};

const findAll = async () => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    return response(RESPONSE_TYPES.OK, users);
  } catch (err) {
    return response(RESPONSE_TYPES.INTERNAL_SERVER_ERROR, null, err.message);
  }
};

const findById = async (userId) => {
  try {
    const user = await User.findOne({
      attributes: {
        exclude: ['password'],
      },
      where: {
        id: userId,
      },
    });

    if (user) {
      return response(RESPONSE_TYPES.OK, user);
    }

    return response(RESPONSE_TYPES.NOT_FOUND, null, 'User does not exist');
  } catch (err) {
    return response(RESPONSE_TYPES.INTERNAL_SERVER_ERROR, null, err.message);
  }
};

module.exports = {
  create,
  findAll,
  findById,
};
