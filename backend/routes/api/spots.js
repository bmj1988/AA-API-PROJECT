const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser, userMatch, exists } = require('../../utils/auth');
const router = express.Router();
const { Spot, User, Review, Booking } = require('../../db/models')

/// RESTORE USER CREATES THE REQ.USER OBJECT

router.use(restoreUser)

/// GET ALL SPOTS

router.get('/', async (req, res) => {
    const spots = await Spot.findAll()

    res.json(spots)
})

/// GET ALL SPOTS WHERE CURRENT (LOGGED IN) USER ID = SPOTS.OWNERID

router.get('/current', requireAuth, async (req, res) => {
    const id = req.user.id
    const spots = await Spot.findAll({
        where: {
            ownerId: id
        }
    })
    if (spots.length = 0) {
        const err = new Error(`We couldn't find any spots owned by you`)
        err.status = 404
        return next(err)
    }
    res.json(spots)
})

/// GET SPOT BY SPOT ID

router.get('/:spotId', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        const err = new Error(`Spot couldn't be found`)
        err.status = 404
        return next(err)
    }
    res.json(spot)
})

/// CREATE NEW SPOT

router.post('/', requireAuth, async (req, res) => {
    const user = req.user
    const newSpot = await user.createSpot(req.body)
    res.json(newSpot)
})

/// ADD IMAGE TO SPOTS

router.post('/:spotId/images', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        const err = new Error(`Spot couldn't be found`)
        return next(err)
    }
    const { url, preview } = req.body
    const spotImage = await spot.createImage({
        imageableId: spot.id,
        imageableType: 'Spot',
        url,
        preview,
    })
    res.json(spotImage)
})


/// EDIT A SPOT

router.put('/:spotId', requireAuth, async (req, res) => {
    /// if not picked up by validation error handler, implement try/catch
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        const err = new Error(`Spot couldn't be found`)
        err.status = 404
        return next(err)
    }
    else if (spot.ownerId !== req.user.id) {
        const err = new Error(`You can only edit spots that are owned by you`)
        err.status = 401
        err.title = 'Unauthorized'
        return next(err)
    }
    spot.update(req.body)
    res.json(spot)
})

/// DELETE A SPOT

router.delete('/:spotId', requireAuth, async (req, res) => {
    const doomSpot = await Spot.findByPk(req.params.spotId)
    if (!doomSpot) {
        const err = new Error(`Spot couldn't be found`)
        err.status = 404
        return next(err)
    }
    else if (doomSpot.ownerId !== req.user.id) {
        const err = new Error(`You can only delete spots that are owned by you`)
        err.status = 401
        err.title = 'Unauthorized'
        return next(err)
    }
    await doomSpot.destroy()
    res.json({ message: 'Successfully deleted' })
})

/// GET A SPOT'S REVIEWS BY SPOTID

router.get('/:spotId/reviews', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        const err = new Error(`Spot couldn't be found`)
        err.status = 404
        return next(err)
    }
    const reviews = await spot.getReviews({
        include: {
            model: Image
        }
    })

    res.json(reviews)
})

router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        const err = new Error(`Spot couldn't be found`)
        err.status = 404
        return next(err)
    }
    if (await Spot.getReview({ where: { userId: req.user.id } })) {
        const err = new Error(`User already has a review for this spot`)
        err.status = 500
        return next(err)
    }
    const review = await spot.createReview({
        userId: req.user.id,
        ...req.body
    })
    res.json(review)
})
/// GET ALL BOOKING FOR SPOT BASED ON SPOT ID
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    exists(spot, 'Spot') //checks to see if spot exists, if not throws err
    userMatch(req.user.id, spot.ownerId, `Spots Bookings`) //checks to see if logged in user is owner of spot, if not throws err
    const bookings = await spot.getBookings()


})


module.exports = router;
