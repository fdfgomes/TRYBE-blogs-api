const blogPostService = require('../services/blogPost.service');

const create = async (req, res) => {
  const post = req.body;
  const { id: userId } = req.user;
  const { status, data, message } = await blogPostService.create(userId, post);
  if (message) return res.status(status).json({ message });
  return res.status(status).json(data);
};

const findAll = async (req, res) => {
  const { status, data, message } = await blogPostService.findAll();
  if (message) return res.status(status).json({ message });
  return res.status(status).json(data);
};

const findById = async (req, res) => {
  const { id: postId } = req.params;
  const { status, data, message } = await blogPostService.findById(postId);
  if (message) return res.status(status).json({ message });
  return res.status(status).json(data);
};

const update = async (req, res) => {
  const updatedPost = req.body;
  const { id: postId } = req.params;
  const { id: userId } = req.user;
  const { status, data, message } = await blogPostService.update(
    userId,
    postId,
    updatedPost,
  );
  if (message) return res.status(status).json({ message });
  return res.status(status).json(data);
};

const deleteById = async (req, res) => {
  const { id: postId } = req.params;
  const { status, data, message } = await blogPostService.deleteById(postId);
  if (message) return res.status(status).json({ message });
  return res.status(status).json(data);
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteById,
};
