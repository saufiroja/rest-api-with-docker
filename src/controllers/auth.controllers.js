const bcrypt = require('bcrypt');
const { User } = require('../database/models');

// Desc   : register
// Routes : POST /api/register
// access : public
const regitser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const isExistEmail = await User.findOne({
      where: { email },
    });

    if (isExistEmail) {
      return res.status(400).json({
        message: 'Email already exist',
      });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    return res.status(201).json({
      message: 'User created successfully',
      user,
    });
  } catch (err) {
    next(err);
  }
};

// Desc   : login
// Routes : POST /api/login
// access : public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({
        message: 'invalid email',
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        message: 'Invalid password',
      });
    }

    return res.status(200).json({
      message: 'Login successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { regitser, login };
