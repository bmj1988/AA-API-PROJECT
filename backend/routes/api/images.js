const express = require('express');
const { requireAuth, restoreUser, imageChecker} = require('../../utils/auth');
const router = express.Router();
const { Spot, Image } = require('../../db/models')

router.use(restoreUser)

router.delete('/:imageId', [requireAuth, imageChecker], async (req, res, next) => {
    let doomImage = await Image.findByPk(req.params.imageId)
    const spot = await Spot.findByPk(doomImage.imageableId)
    if (req.imageType === 'spot' && doomImage.url === spot.previewImage) await spot.update({previewImage: null});
    await doomImage.destroy()
    return res.json({ message: 'Successfully deleted' })
});

module.exports = router;
