const {Booking, Spot, User} = require('../db/models')

const checkBookingConflictsSPOT = async function(req, res, next) {
const spot = await Spot.findByPk(req.params.spotId)
// if (req.user.id === spot.ownerId) {
//     const err = new Error('Cannot book your own spot!')
//     err.status = 401
//     return next(err)
// }
const {startDate, endDate} = req.body
const errors= {}
const allSpotBookings = await spot.getBookings()
for (let booking of allSpotBookings) {
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
return next()
}

const checkBookingConflictsBOOKING = async function (req, res, next) {
    const booking = await Booking.findByPk(req.params.bookingId)
    if (booking.endDate < new Date()) {
       return res.status(403).json({message: "Past bookings can't be modified"})
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
    return next()
}

module.exports = {checkBookingConflictsSPOT, checkBookingConflictsBOOKING}
