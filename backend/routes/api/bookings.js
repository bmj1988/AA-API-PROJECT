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
    const user = User.findByPk(req.user.id)
    const bookings = user.getBookings({
        include: {
            model: Spot
        }
    })
    exists (bookings, 'Bookings')
    res.json(bookings)
})

module.exports = router;
