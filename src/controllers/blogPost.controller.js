const blogPostService = require('../services/blogPost.service');

const create = async (req, res) => {
  const post = req.body;
  const { id: userId } = req.user;
  const { status, data, message } = await blogPostService.create(userId, post);
  if (message) return res.status(status).json({ message });
  return res.status(status).json(data);
};

module.exports = {
  create,
};
