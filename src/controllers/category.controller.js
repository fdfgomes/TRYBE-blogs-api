const categoryService = require('../services/category.service');

const create = async (req, res) => {
  const { name } = req.body;
  const { status, data, message } = await categoryService.create(name);
  if (message) return res.status(status).json({ message });
  return res.status(status).json(data);
};

const findAll = async (req, res) => {
  const { status, data, message } = await categoryService.findAll();
  if (message) return res.status(status).json({ message });
  return res.status(status).json(data);
};

module.exports = {
  create,
  findAll,
};
