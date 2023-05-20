const router = require('express').Router();

const authMiddleware = require('../middlewares/auth.middleware');
const categoryMiddleware = require('../middlewares/category.middleware');
const categoryController = require('../controllers/category.controller');

router.post(
  '/',
  authMiddleware.validateToken,
  categoryMiddleware.validateName,
  categoryController.create,
);

module.exports = router;
