const jwt = require('jsonwebtoken');

const { JWT_PUBLIC_KEY, JWT_ALGORITHMS } = process.env;

const isAuthentication = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];

    const result = jwt.verify(token, JWT_PUBLIC_KEY, {
      algorithms: JWT_ALGORITHMS,
    });

    req.user = result;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'unauthorized',
      error,
    });
  }
};

module.exports = { isAuthentication };
