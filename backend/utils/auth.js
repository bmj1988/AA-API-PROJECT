const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User, Spot, Image, Booking, Review } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

const setTokenCookie = (res, user) => {
  // Create the token.
  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
  };
  const token = jwt.sign(
    { data: safeUser },
    secret,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Set the token cookie
  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax"
  });

  return token;
};

const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies;
  req.user = null;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.findByPk(id, {
        attributes: {
          include: ['email', 'createdAt', 'updatedAt']
        }
      });
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};

const requireAuth = function (req, _res, next) {
  if (req.user) return next();

  const err = new Error('Authentication required');
  err.title = 'Authentication required';
  err.errors = { message: 'Authentication required' };
  err.status = 401;
  return next(err);
}

const requireAuthorizeSpot = async function (req, _res, next) {

  const spot = await Spot.findByPk(req.params.spotId)
  if (!spot) return _res.status(404).json({ message: `Spot couldn't be found` })
  if (req.user.id === spot.ownerId) return next()

  const err = new Error('Authorization required');
  err.title = 'Authorization required';
  err.errors = { message: 'You are not authorized to access this feature.' };
  err.status = 401;
  return next(err);
}

const authorizeReview = async function (req, _res, next) {
  const review = await Review.findByPk(req.params.reviewId)
  if (!review) return _res.status(404).json({ message: `Revew couldn't be found` })
  if (review.userId === req.user.id) return next()

  const err = new Error('Authorization required');
  err.title = 'Authorization required';
  err.errors = { message: 'You are not authorized to access this feature.' };
  err.status = 401;
  return next(err);
}

const info = function (req, _res, next) {
  const urlstring = req.originalUrl
  if (urlstring.includes('spot-images')) {
    req.imageType = 'spot';
    req.model = 'Image';
  }
  if (urlstring.includes('review-images')) {
    req.imageType = 'review';
    req.model = 'Image';
  }
  if (urlstring.includes('api/spots')) req.model = 'Spot';
  if (urlstring.includes('api/bookings')) req.model = 'Booking';
  if (urlstring.includes('api/reviews')) req.model = 'Review';
  return next()
}

const bookingAuthorize = async function (req, _res, next) {
  const booking = await Booking.findByPk(req.params.bookingId)
  if (!booking) return _res.status(404).json({ message: 'Booking could not be found' })
  if (req.user.id === booking.userId) return next()

  const err = new Error('Authorization required');
  err.title = 'Authorization required';
  err.errors = { message: 'You are not authorized to access this feature.' };
  err.status = 401;
  return next(err);

}

const userMatch = async function (req, _res, next) {
  if (req.model === 'Spot') {
    checker = await Spot.findByPk(req.params.spotId)
    if (checker.ownerId === req.user.id) return _res.status(403).json({ message: `You cannot book your own spot.` })
    return next()
  }
  // else if (req.model === 'Booking') checker = await Booking.findByPk(req.params.bookingId)
  // else if (req.model === 'Review') checker = await Review.findByPk(req.params.reviewId)

  return next()
}

const imageChecker = async function (req, res, next) {
  try {
    let doomImage = await Image.findByPk(req.params.imageId)
  }
  catch {
    if (req.imageType === 'spot') return res.status(404).json({ message: `Spot image couldn't be found` })
    else if (req.imageType === 'review') return res.status(404).json({ message: `Review image couldn't be found` })
  }
  if (req.imageType === 'spot') {
    const spotImage = await Image.findByPk(req.params.imageId)
    const spot = await Spot.findByPk(spotImage.imageableId)
    if (req.user.id !== spot.ownerId) return res.status(403).json({ message: `Cannot delete spot images for spots you don't own.` })
  }
  if (req.imageType === 'review') {
    const reviewImage = await Image.findByPk(req.params.imageId)
    const review = await Review.findByPk(reviewImage.imageableId)
    if (req.user.id !== review.userId) return res.status(403).json({message: `Cannot delete review images for other users' reviews.`})
  }
  return next()
}

const exists = async function (req, res, next) {
  let checker;
  if (req.model === 'Spot') checker = await Spot.findByPk(req.params.spotId)
  else if (req.model === 'Booking') checker = await Booking.findByPk(req.params.bookingId)
  else if (req.model === 'Review') checker = await Review.findByPk(req.params.reviewId)
  if (!checker) {
    return res.status(404).json({ message: `${req.model} couldn't be found` })
  }
  return next()
}

module.exports = {
  setTokenCookie, restoreUser, requireAuth, userMatch, exists,
  requireAuthorizeSpot, info, bookingAuthorize, authorizeReview, imageChecker
};
