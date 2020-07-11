const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('jwt-token');

  if (!token) {
    return res.status(401).json({ error: 'access denied.' });
  }

  try {
    const verified = jwt.verify(token, 'asecrettoken');
    req.user = verified.user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'access denied' });
  }
};

module.exports = auth;
