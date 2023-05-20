const RESPONSE_TYPES = require('../constants/RESPONSE_TYPES');
const { Category } = require('../models');

const response = (type, data, message = '') => ({
  status: type,
  data,
  message,
});

const create = async (name) => {
  try {
    const createdCategory = await Category.create({ name });

    const { null: id } = createdCategory;

    return response(RESPONSE_TYPES.CREATED, { id, name });
  } catch (err) {
    return response(RESPONSE_TYPES.INTERNAL_SERVER_ERROR, null, err.message);
  }
};

module.exports = {
  create,
};
