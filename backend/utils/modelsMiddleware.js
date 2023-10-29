const { User, Spot, Image, Booking } = require('../db/models');

const requireAuthorizeBooking = async function (req, _res, next) {
    const booking = await Booking.findByPk(req.params.bookingId)
    if(!booking) res.json({message: `Booking couldn't be found`})
    if (req.user.id === booking.userId) return next()

    const err = new Error('Authorization required');
    err.title = 'Authorization required';
    err.errors = { message: 'You are not authorized to access this feature.' };
    err.status = 401;
    return next(err);
  }
