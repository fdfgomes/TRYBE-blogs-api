const router = require('express').Router();

const authMiddleware = require('../middlewares/auth.middleware');
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

router.delete('/me', authMiddleware.validateToken, userController.deleteById);

router.get('/:id', authMiddleware.validateToken, userController.findById);

router.get('/', authMiddleware.validateToken, userController.findAll);

module.exports = router;
