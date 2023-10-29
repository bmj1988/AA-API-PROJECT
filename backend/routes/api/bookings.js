const express = require('express');
const { requireAuth, restoreUser, bookingAuthorize } = require('../../utils/auth');
const { checkBookingConflictsBOOKING } = require('../../utils/bookingChecker')
const router = express.Router();
const { Spot, User, Booking } = require('../../db/models')

router.use(restoreUser)

/// GET ALL BOOKINGS MADE BY CURRENT USER
///looks like i'm going to be adding some stuff.
router.get('/current', requireAuth, async (req, res, next) => {
    const user = await User.findByPk(req.user.id)
    const bookings = await user.getBookings({
        include: {
            model: Spot,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }
    })
    if (bookings.length === 0) {
        const err = new Error(`Couldn't find any bookings for this user`)
        err.status = 404
        return next(err)
    }
    res.json({Bookings: bookings})
})

/// EDIT A BOOKING

router.put('/:bookingId', [requireAuth, bookingAuthorize, checkBookingConflictsBOOKING], async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    await booking.update(req.body, {validate: true})
    res.json(booking)
})

 /// DELETE A BOOKING

router.delete('/:bookingId', [requireAuth, bookingAuthorize], async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    if (booking.startDate < new Date()) {
        const err = new Error(`Bookings that have been started can't be deleted`)
        err.status = 403
        return next(err)
    }
    await booking.destroy()
    res.json({message: 'Successfully deleted'})

})

module.exports = router;
