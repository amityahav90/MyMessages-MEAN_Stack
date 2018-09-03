// We need to check 2 things:
// 1. Does the user have a web token?
// 2. We need to validate this token.

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret_this_should_be_longer');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed!' });
  }
};