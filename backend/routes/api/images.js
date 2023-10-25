const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser, userMatch, exists } = require('../../utils/auth');
const router = express.Router();
const { Spot, User, Review, Booking, Image } = require('../../db/models')

router.use(restoreUser)

router.delete('/:imageId', requireAuth, async (req, res) => {
    const doomImage = await Image.findByPk(req.params.imageId)
    exists(doomImage, 'Image')
    if (doomImage.imageableType === 'Spot') {
        const imageSpot = await doomImage.getSpot()
        exists(imageSpot, 'Spot')
        userMatch(req.user.id, imageSpot.ownerId, 'Image')
        await doomImage.destroy()
        res.json({ message: 'Successfully deleted' })
    }
    else {
        const imageReview = await doomImage.getReview()
        exists(imageReview, 'Review')
        userMatch(req.user.id, imageReview.userId, 'Image')
        await doomImage.destroy()
        res.json({message: 'Successfully deleted'})
    }
})

module.exports = router;
