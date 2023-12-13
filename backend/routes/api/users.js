const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

/// signup a new user
router.post(
  '/',
  async (req, res, next) => {
    const { email, password, username, firstName, lastName } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const emailExists = await User.findOne({
      where: {
        email: email
      }
    })

    const usernameExists = await User.findOne({
      where: {
        username: username
      }
    })

    if (emailExists) {
      const err = new Error('User already exists')
      err.errors = { email: 'User with that email already exists' }
      err.status = 500
      return next(err)
    }
    if (usernameExists) {
      const err = new Error('User already exists')
      err.status = 500
      err.errors = { username: 'User with that username already exists' }
      return next(err)
    }

    const user = await User.create({ email, username, hashedPassword, firstName, lastName });

    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);

module.exports = router;
