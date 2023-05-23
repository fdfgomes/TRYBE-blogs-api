const userService = require('../services/user.service');

const create = async (req, res) => {
  const user = req.body;
  const { status, data, message } = await userService.create(user);
  if (message) return res.status(status).json({ message });
  return res.status(status).json(data);
};

const deleteById = async (req, res) => {
  const { id: userId } = req.user;
  const { status, data, message } = await userService.deleteById(userId);
  if (message) return res.status(status).json({ message });
  return res.status(status).json(data);
};

const findAll = async (req, res) => {
  const user = req.body;
  const { status, data, message } = await userService.findAll(user);
  if (message) return res.status(status).json({ message });
  return res.status(status).json(data);
};

const findById = async (req, res) => {
  const { id: userId } = req.params;
  const { status, data, message } = await userService.findById(userId);
  if (message) return res.status(status).json({ message });
  return res.status(status).json(data);
};

module.exports = {
  create,
  deleteById,
  findAll,
  findById,
};
