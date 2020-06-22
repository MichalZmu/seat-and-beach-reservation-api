const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
      const token = req.headers.authorization;
      jwt.verify(token, "iFOIOomHZRkdNuqgWEYMjMQ0YV6v2aOD");
      next();
  } catch (error) {
      res.status(401).json({
          message: 'Auth failed!'
      });
  }

};
