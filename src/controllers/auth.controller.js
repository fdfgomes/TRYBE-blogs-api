const authService = require('../services/auth.service');

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const { status, data, message } = await authService.signIn(email, password);
  if (message) return res.status(status).json({ message });
  return res.status(status).json(data);
};

module.exports = {
  signIn,
};
