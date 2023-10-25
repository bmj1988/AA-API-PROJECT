const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser, userMatch, exists } = require('../../utils/auth');
const router = express.Router();
const { Spot, User, Review, Booking } = require('../../db/models')

router.use(restoreUser)

/// GET ALL BOOKINGS MADE BY CURRENT USER
router.get('/current', requireAuth, async (req, res) => {
    const user = await User.findByPk(req.user.id)
    const bookings = user.getBookings({
        include: {
            model: Spot
        }
    })
    exists (bookings, 'Bookings')
    res.json(bookings)
})

/// EDIT A BOOKING

router.put('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    exists(booking, 'Booking')
    userMatch(req.user.id, booking.userId, 'Booking')
    if (booking.endDate < Sequelize.literal('CURRENT_DATE')) {
        const err = new Error(`Past bookings can't be modified`)
        err.status = 401
        return next(err)
    }
    await booking.update(req.body)
    res.json(booking)
})

router.delete('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    exists(booking, 'Booking')
    userMatch(req.user.id, booking.userId, 'Booking')
    if (booking.startDate > Sequelize.literal('CURRENT_DATE')) {
        const err = new Error(`Bookings that have been started can't be deleted`)
        err.status = 403
        return next(err)
    }
    await booking.destroy()
    res.json({message: 'Successfully deleted'})

})

module.exports = router;
