const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users')
const spotsRouter = require('./spots')
const reviewRouter = require('./reviews')
const bookingsRouter = require('./bookings')
const imagesRouter = require('./images')
const messagesRouter = require('./messages.js')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.use(restoreUser)

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewRouter);
router.use('/bookings', bookingsRouter);
router.use('/*-images', imagesRouter);
router.use('/messages', messagesRouter)

router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

module.exports = router;
