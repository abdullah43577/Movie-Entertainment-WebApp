const jwt = require('jsonwebtoken');
const User = require('../model/User');

// implement a middleware that checks the validity of the token-cookie stored in the browser
const checkAuthToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { id } = jwt.verify(token, 'movie_database_secret');
    req.user = await User.findById(id); // find user with corresponding ID
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: 'Request not Authorized' });
  }
};

module.exports = checkAuthToken;
