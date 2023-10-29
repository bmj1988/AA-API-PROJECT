const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser, userMatch, imageChecker, requireAuthorizeSpotImage } = require('../../utils/auth');
const router = express.Router();
const { Spot, User, Review, Booking, Image } = require('../../db/models')

router.use(restoreUser)

router.delete('/:imageId', [requireAuth, imageChecker], async (req, res, next) => {
    let doomImage = await Image.findByPk(req.params.imageId)
    const spot = await Spot.findByPk(doomImage.imageableId)
    if (req.imageType === 'spot' && doomImage.url === spot.previewImage) spot.previewImage = null
    await doomImage.destroy()
    return res.json({ message: 'Successfully deleted' })
});

module.exports = router;
