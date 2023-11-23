const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
  const errors = { email: '', password: '' };
  console.log(err.message, err.code);

  // login errors
  if (err.message === 'incorrect email') {
    errors.email = 'that email is not registered';
  }

  if ((err.message = 'incorrect password')) {
    errors.password = 'that password is incorrect';
  }

  // signup errors

  // duplicate email
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60; // equivalent to 3 days

// creating json web token
// payload => => secret => signature
const createToken = (id) => {
  return jwt.sign({ id }, 'movie_database_secret', {
    expiresIn: maxAge,
  });
};

const api_get = async (req, res) => {
  res.status(200).json({ message: 'Welcome to FlicksOnDemand Server' });
};

const register_user_post = async (req, res) => {
  const { email, password } = req.body;
  // save registered user to database
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: maxAge * 1000 });
    res.status(201).json({ message: 'User registered successfully', user: user._id, token });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(401).json({ err, errors });
  }
};

const login_user_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: maxAge * 1000 });
    res.status(200).json({ message: 'User logged in successfully', user: user._id, token });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(401).json({ errors });
  }
};

const checkToken = (req, res) => {
  res.status(200).json({ message: 'Token Valid!' });
};

const logout_user_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({ message: 'User logged out successfully' });
};

module.exports = { api_get, register_user_post, login_user_post, checkToken, logout_user_get };
