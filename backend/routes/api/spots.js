const express = require('express');
const { requireAuth, restoreUser, userMatch, exists, info, requireAuthorizeSpot, authorizeReview } = require('../../utils/auth');
const { queryParser, avgRater, numReviews } = require('../../utils/queryParser')
const router = express.Router();
const Sequelize = require('sequelize')
const { checkBookingConflictsSPOT } = require('../../utils/bookingChecker')
const { Spot, User, Image, Review, sequelize } = require('../../db/models')
const Op = Sequelize.Op;

/// RESTORE USER CREATES THE REQ.USER OBJECT

router.use(restoreUser)

/// GET ALL SPOTS

router.get('/', queryParser, async (req, res) => {
    const spotsArray = []
    const query = {}
    const returbObj = {};
    const whereObj = {
        lat: { [Op.between]: [req.minLat, req.maxLat] },
        lng: { [Op.between]: [req.minLng, req.maxLng] },
        price: { [Op.between]: [req.minPrice, req.maxPrice] }
    }
    if (req.query.size) {
        returbObj.size = req.query.size
    }
    if (req.query.page) {
        returbObj.page = req.query.page
    }
    if (req.query.locality) {
        whereObj.city = {[Op.like] : req.query.locality }
    }
    query.limit = req.querySize;
    query.offset = req.querySize * (req.queryPage - 1)
    const spots = await Spot.findAll({
        where: whereObj,
        ...query
    })

    for (let spot of spots) {
        let avgRating = await avgRater(spot.id)
        const spotObj = {
            ...spot.dataValues,
            avgRating: avgRating
        }
        spotsArray.push(spotObj)
    }



    res.json({ Spots: spotsArray, ...returbObj })
})

/// GET ALL SPOTS WHERE CURRENT (LOGGED IN) USER ID = SPOTS.OWNERID

router.get('/current', requireAuth, async (req, res, next) => {
    const user = await User.findByPk(parseInt(req.user.id))
    const spots = await user.getSpots({
        include: [{
            model: Review,
            attributes: [],
        }
        ],
        attributes: {
            include: [
                [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('Reviews.stars')), 2), 'avgRating'],
            ]
        },
        group: ['Spot.id'],
    })

    if (spots.length === 0) {
        const err = new Error(`We couldn't find any spots owned by you`)
        err.status = 404
        return next(err)
    }

    res.json({ Spots: spots })
})

/// GET SPOT BY SPOT ID

router.get('/:spotId', [info, exists], async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [{
            model: User,
            as: 'Owner',
            attributes: ['id', 'firstName', 'lastName']
        },
        {
            model: Image,
            as: 'SpotImages',
            attributes: ['id', 'url', 'preview']
        }]
    })
    let avgRatings = await avgRater(spot.id)
    let numReviewz = await numReviews(spot.id)
    const newspot = {
        ...spot.dataValues,
        avgRating: avgRatings,
        numReview: numReviewz,
    }
    res.json(newspot)
})

/// CREATE NEW SPOT

router.post('/', requireAuth, async (req, res) => {
    const user = req.user
    const newSpot = await user.createSpot(req.body, { validate: true })
    const displaySpot = await Spot.findByPk(newSpot.id, {
        attributes: {
            exclude: ['previewImage']
        }
    })
    return res.json(displaySpot)
})

/// ADD IMAGE TO SPOTS

router.post('/:spotId/images', [requireAuth, requireAuthorizeSpot], async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    const { url, preview } = req.body
    if (preview === undefined) {
        const err = new Error('Must assign a preview value to Spot images!')
        err.status = 400
        return next(err)
    }
    if (await spot.getSpotImages({ where: { url: url } }).length > 0) {
        const err = new Error('This image URL is already in use!')
        err.status = 400
        return next(err)
    }
    const spotImage = await spot.createSpotImage({
        imageableId: spot.id,
        imageableType: 'Spot',
        url,
        preview,
    }, { validate: true })
    if (spotImage.preview === true) await spot.update({
        previewImage: spotImage.url
    })
    return res.json({ id: spotImage.id, url: spotImage.url, preview: spotImage.preview })
})


/// EDIT A SPOT

router.put('/:spotId', [requireAuth, requireAuthorizeSpot], async (req, res, next) => {
    /// if not picked up by validation error handler, implement try/catch
    const spot = await Spot.findByPk(req.params.spotId, {
        attributes: {
            exclude: ['previewImage']
        }
    })
    try {
        await spot.update(req.body, { validate: true })
    }
    catch (e) {
        return next(e)
    }
    res.json(spot)
})

/// DELETE A SPOT

router.delete('/:spotId', [requireAuth, requireAuthorizeSpot], async (req, res, next) => {
    const doomSpot = await Spot.findByPk(req.params.spotId)
    await doomSpot.destroy()
    res.json({ message: 'Successfully deleted' })
})

/// GET A SPOT'S REVIEWS BY SPOTID

router.get('/:spotId/reviews', [info, exists], async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    const reviews = await spot.getReviews({
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        },
        {
            model: Image,
            as: 'ReviewImages',
            attributes: ['id', 'url']
        }]
    })

    res.json({ Reviews: reviews })
})

///CREATE REVIEW BY SPOT ID

router.post('/:spotId/reviews', [requireAuth, info, exists], async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (spot.ownerId === req.user.id) res.status(403).json({ message: `You cannot review your own spots!` })
    const reviews = await Review.findAll({
        where: {
            spotId: spot.id,
            userId: req.user.id
        }
    })
    if (reviews.length >= 1) return res.status(400).json({ message: `User already has a review for this spot` })
    const review = await spot.createReview({
        userId: req.user.id,
        ...req.body
    })
    res.json({ review: review.review, stars: review.stars })
})
/// GET ALL BOOKING FOR SPOT BASED ON SPOT ID
router.get('/:spotId/bookings', [requireAuth, info, exists], async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (req.user.id !== spot.ownerId) {
        const bookings = await spot.getBookings({
            attributes: ['spotId', 'startDate', 'endDate']
        })
        return res.json({ Bookings: bookings })
    }
    else {
        const bookings = await spot.getBookings({
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        })
        return res.json({ Bookings: bookings })
    }

})

///CREATE A BOOKING BY SPOT ID

router.post('/:spotId/bookings', [requireAuth, info, exists, userMatch, checkBookingConflictsSPOT], async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    const booking = await spot.createBooking({
        userId: req.user.id,
        ...req.body
    }, { validate: true })
    res.json(booking)
})

/// Return a boolean indicating whether or not booking requested dates is possible

router.post('/:spotId/availability', [requireAuth, checkBookingConflictsSPOT], async (req, res, next) => {
    const message = {
        available: true
    }
    res.json(message)
})

module.exports = router;
