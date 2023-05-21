const RESPONSE_TYPES = require('../constants/RESPONSE_TYPES');
const { sequelize, BlogPost, PostCategory } = require('../models');

const response = (type, data, message = '') => ({
  status: type,
  data,
  message,
});

const create = async (userId, { title, content, categoryIds }) => {
  try {
    const createdPost = await sequelize.transaction(async (transaction) => {
      const post = await BlogPost.create(
        { title, content, userId },
        { transaction },
      );

      const { null: postId } = post;

      const postCategories = categoryIds.map((categoryId) => ({
        postId,
        categoryId,
      }));

      await PostCategory.bulkCreate(postCategories, { transaction });

      return { ...post.dataValues, id: postId };
    });
    return response(RESPONSE_TYPES.CREATED, createdPost);
  } catch (err) {
    return response(RESPONSE_TYPES.INTERNAL_SERVER_ERROR, null, err.message);
  }
};

module.exports = {
  create,
};
