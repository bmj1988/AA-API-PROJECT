const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser, userMatch, exists, bookingAuthorize } = require('../../utils/auth');
const router = express.Router();
const { Spot, User, Review, Booking } = require('../../db/models')

router.use(restoreUser)

/// GET ALL BOOKINGS MADE BY CURRENT USER
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
    // exists (bookings, 'Bookings')
    res.json({Bookings: bookings})
})

/// EDIT A BOOKING

router.put('/:bookingId', [requireAuth, bookingAuthorize], async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    if (!booking) {
        res.json({message: `Booking couldn't be found`})
    }
    if (req.user.id !== booking.userId) {
        const err = new Error(`Can only edit your own bookings`)
    }

    if (booking.endDate < new Date()) {
        res.json({message: "Past bookings can't be modified"})
    }
    const {startDate, endDate} = req.body
    const bookingId = booking.id
    const errors = {}
    const allSpotBookings = await Booking.findAll({where: {spotId: booking.spotId}})
    for (let booking of allSpotBookings) {
        if (booking.id === bookingId) continue;
        if (startDate > booking.startDate && startDate < booking.endDate || startDate === booking.startDate || startDate === booking.endDate) {
            Object.assign(errors, {startDate: 'Start date conflicts with an existing booking'})
            console.log(`THIS IS THE CONFLICTING BOOKING: ${booking.startDate} ending ${booking.endDate} here ${startDate}`)
        }
        if (endDate > booking.startDate && endDate < booking.endDate || endDate === booking.startDate || endDate === booking.endDate) {
            Object.assign(errors, {endDate: "End date conflicts with an existing booking"})
            console.log(`THIS IS THE CONFLICTING BOOKING: ${booking.startDate} ending ${booking.endDate} here ${endDate}`)
        }
        if (startDate < booking.startDate && endDate > booking.endDate) {
            Object.assign(errors, {overlappingBooking: "Your dates contain a set of dates which conflict with an existing booking"})
        }
    }
    if (Object.keys(errors).length >= 1) {
        return res.status(403).json({message: "Sorry, this spot is already booked for the specified dates", errors: errors})
    }

    await booking.update(req.body)
    res.json(booking)
})

 /// DELETE A BOOKING

router.delete('/:bookingId', [requireAuth, bookingAuthorize], async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    if (!booking) {
        const err = new Error(`Booking couldn't be found`)
        err.status = 404
        return next(err)
    }
    if (req.user.id !== booking.userId) {
        const err = new Error(`Cannot delete another user's booking!`)
        err.status = 401
        return next(err)
    }
    if (booking.startDate > new Date()) {
        const err = new Error(`Bookings that have been started can't be deleted`)
        err.status = 403
        return next(err)
    }
    await booking.destroy()
    res.json({message: 'Successfully deleted'})

})

module.exports = router;
