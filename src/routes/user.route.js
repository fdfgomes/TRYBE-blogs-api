const router = require('express').Router();

const userMiddleware = require('../middlewares/user.middleware');
const userController = require('../controllers/user.controller');

router.post(
  '/',
  userMiddleware.validateDisplayName,
  userMiddleware.validateEmail,
  userMiddleware.validatePassword,
  userMiddleware.validateImage,
  userController.create,
);

module.exports = router;
