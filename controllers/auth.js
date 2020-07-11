const db = require('../db/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');

db.on('error', console.error.bind(console, 'MongoDB connection error: '));

const authenticateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('something went wrong');
  }
};

const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ error: 'invalid email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ error: 'something went wrong.' });
    }

    const payload = {
      user: {
        id: user._id
      }
    };

    jwt.sign(payload, 'asecrettoken', { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
};

module.exports = { authenticateUser, signInUser };
