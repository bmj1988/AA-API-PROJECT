const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review } = require('../../db/models');

const router = express.Router();

router.use(restoreUser)

/// GET ALL REVIEW BY USER ID (CURRENT USER)

router.get('/current', requireAuth, async (req, res) => {
    /// STOPGAP -- NEED TO FIND METHOD TO GRAB CURRENT USER LOGIN CREDS
    const id = req.user.id
    const user = await User.findByPk(id)
    const reviews = await user.getReviews(
        {include: [{
            model: Spot
        },{
            model: Image
        }
    ]}
    )
    res.json(reviews)
})

/// POST AN IMAGE TO REVIEW

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId)
    if (!review) {
        const err = new Error('Could not find requested review')
        err.status = 404
        return next(err)
    }
    else if (review.userId !== req.user.id) {
        const err = new Error('Can only add images to your own reviews!')
        err.status = 401
        return next(err)
    }
    else if (review.getImages().length > 10) {
        const err = new Error('Maximum number of images for this resource was reached')
        err.status = 403
        return next(err)
    }
    const addedImageReview = await review.createImage({
        url: req.body.url,
        imageableType: 'Review',

    })
    res.json({id: addedImageReview.id, url: addedImageReview.url})
})

/// EDIT A REVIEW

router.put('/:reviewId', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId)
    if (!review) {
        const err = new Error(`Review couldn't be found`)
        err.status = 404
        return next(err)
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

router.delete('/:reviewId', requireAuth, async (req, res) => {
    const doomReview = await Review.findByPk(req.params.reviewId)
    if (!doomReview) {
        const err = new Error(`Review couldn't be found`)
        err.status = 404
        return next(err)
    }
    else if (doomReview.userId !== req.user.id) {
        const err = new Error('Can only delete your own reviews!')
        err.status = 401
        return next(err)
    }
    await doomReview.destroy()
    res.json({message: 'Successfully deleted'})
})





module.exports = router;
