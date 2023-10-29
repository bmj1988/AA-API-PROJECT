const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth, authorizeReview, exists } = require('../../utils/auth');
const { User, Spot, Review, Image } = require('../../db/models');

const router = express.Router();

router.use(restoreUser)

/// GET ALL REVIEW BY USER ID (CURRENT USER)

router.get('/current', requireAuth, async (req, res) => {
    const id = req.user.id
    const user = await User.findByPk(id)
    const reviews = await user.getReviews(
        {
            include: [{
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }, {
                model: Image,
                as: 'ReviewImages',
                attributes: ['id', 'url']
            }, {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
            ]
        }
    )
    res.json(reviews)
})

/// POST AN IMAGE TO REVIEW

router.post('/:reviewId/images', [requireAuth, authorizeReview], async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId)
    const allPix = await Image.findAll({
        where: {
            imageableId: review.id,
            imageableType: 'Review'
        }
    })

    if (await allPix.length >= 10) {
        return res.status(403).json({ message: 'Maximum number of images for this resource was reached' })
    }
    const addedImageReview = await review.createReviewImage({
        url: req.body.url,
        imageableType: 'Review',

    })
    res.json({ id: addedImageReview.id, url: addedImageReview.url })
})

/// EDIT A REVIEW

router.put('/:reviewId', [requireAuth, authorizeReview], async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId)
    if (!review) {
        res.json({message: `Review couldn't be found`})
    }
    else if (review.userId !== req.user.id) {
        const err = new Error('Can only edit your own reviews!')
        err.status = 401
        return next(err)
    }
    await review.update(req.body)
    res.json(review)
})

/// DELETE A REVIEW

router.delete('/:reviewId', [requireAuth, authorizeReview], async (req, res, next) => {
    const doomReview = await Review.findByPk(req.params.reviewId)
    await doomReview.destroy()
    res.json({ message: 'Successfully deleted' })
})





module.exports = router;
