const express = require('express')
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

/// signup a new user
router.post(
    '/', validateSignup,
    async (req, res) => {
      const { email, password, username, firstName, lastName } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
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
//FOR TESTING

// fetch('/api/users', {
//   method: 'GET',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `Vi9vnoFy-mULS_gHyLpzD5T7e4WerFRhW924`
//   },
//   body: JSON.stringify({
//     email: 'firestar@spider.man',
//     username: 'fooblestar',
//     password: 'omghellohi',
//     firstName: 'breeble',
//     lastName: 'brooble'
//   })
// }).then(res => res.json()).then(data => console.log(data))

// fetch('/api/session', {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `Vi9vnoFy-mULS_gHyLpzD5T7e4WerFRhW924`
//   },
//   body: JSON.stringify({ credential: 'fooblestar', password: 'omghellohi' })
// }).then(res => res.json()).then(data => console.log(data));
