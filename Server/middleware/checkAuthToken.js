const jwt = require('jsonwebtoken');

// implement a middleware that checks the validity of the token-cookie stored in the browser
const checkAuthToken = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { id } = jwt.verify(token, 'movie_database_secret');
    if (id) {
      // res.status(200).json({ message: 'Token Valid!', user: id });
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: 'Request not Authorized' });
  }
};

module.exports = checkAuthToken;
