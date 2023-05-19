const userService = require('../services/user.service');

const create = async (req, res) => {
  const user = req.body;
  const { status, data, message } = await userService.create(user);
  if (message) return res.status(status).json({ message });
  return res.status(status).json(data);
};

module.exports = {
  create,
};
