const ERROR_MESSAGES = require('../constants/ERROR_MESSAGES');
const RESPONSE_TYPES = require('../constants/RESPONSE_TYPES');
const { BlogPost, Category } = require('../models');

const validateTitle = (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res
        .status(RESPONSE_TYPES.BAD_REQUEST)
        .json({ message: ERROR_MESSAGES.MISSING_REQUIRED_FIELDS });
    }
  } catch (err) {
    return res
      .status(RESPONSE_TYPES.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }

  next();
};

const validateContent = (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res
        .status(RESPONSE_TYPES.BAD_REQUEST)
        .json({ message: ERROR_MESSAGES.MISSING_REQUIRED_FIELDS });
    }
  } catch (err) {
    return res
      .status(RESPONSE_TYPES.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }

  next();
};

const receivedCategoryIdsAreValid = async (receivedCategories) => {
  const { count } = await Category.findAndCountAll({
    where: { id: receivedCategories },
  });
  return count === receivedCategories.length;
};

const validateCategoryIds = async (req, res, next) => {
  try {
    const { categoryIds } = req.body;

    if (!categoryIds || !(await receivedCategoryIdsAreValid(categoryIds))) {
      return res
        .status(RESPONSE_TYPES.BAD_REQUEST)
        .json({ message: ERROR_MESSAGES.INVALID_CATEGORY_IDS });
    }
  } catch (err) {
    return res
      .status(RESPONSE_TYPES.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }

  next();
};

const validateAuthor = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const { userId } = await BlogPost.findOne({
      where: {
        id: postId,
      },
    });
    if (userId !== req.user.id) {
      return res
        .status(RESPONSE_TYPES.UNAUTHORIZED)
        .json({ message: 'Unauthorized user' });
    }
  } catch (err) {
    return res
      .status(RESPONSE_TYPES.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
  next();
};

const validateBlogPost = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const blogPost = await BlogPost.findOne({
      where: {
        id: postId,
      },
    });
    if (!blogPost) {
      return res
        .status(RESPONSE_TYPES.NOT_FOUND)
        .json({ message: 'Post does not exist' });
    }
  } catch (err) {
    return res
      .status(RESPONSE_TYPES.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
  next();
};

module.exports = {
  validateTitle,
  validateContent,
  validateCategoryIds,
  validateAuthor,
  validateBlogPost,
};
