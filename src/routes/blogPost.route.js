const router = require('express').Router();

const authMiddleware = require('../middlewares/auth.middleware');
const blogPostMiddleware = require('../middlewares/blogPost.middleware');
const blogPostController = require('../controllers/blogPost.controller');

router.post(
  '/',
  authMiddleware.validateToken,
  blogPostMiddleware.validateTitle,
  blogPostMiddleware.validateContent,
  blogPostMiddleware.validateCategoryIds,
  blogPostController.create,
);

router.delete(
  '/:id',
  authMiddleware.validateToken,
  blogPostMiddleware.validateBlogPost,
  blogPostMiddleware.validateAuthor,
  blogPostController.deleteById,
);

router.put(
  '/:id',
  authMiddleware.validateToken,
  blogPostMiddleware.validateAuthor,
  blogPostMiddleware.validateTitle,
  blogPostMiddleware.validateContent,
  blogPostController.updateById,
);

router.get(
  '/search',
  authMiddleware.validateToken,
  blogPostController.findAllBySearchTerm,
);

router.get('/:id', authMiddleware.validateToken, blogPostController.findById);

router.get('/', authMiddleware.validateToken, blogPostController.findAll);

module.exports = router;
