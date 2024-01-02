const express = require('express');
const { requireAuth, restoreUser } = require('../../utils/auth');
const router = express.Router();
const Sequelize = require('sequelize')
const { Spot, User, Image, Review, sequelize, Message } = require('../../db/models')
const Op = Sequelize.Op;

router.use(restoreUser)

/// GET ALL CURRENT USERS MESSAGES (INBOX THUNK)

router.get('/replies/:messageId', requireAuth, async (req, res) => {
    const replies = await Message.findAll({
        where: {
            [Op.or]: [
                {id: req.params.messageId},
                {replyId: req.params.messageId}
            ]
        },
        include: [{
            model: User,
            as: 'sender',
            attributes: ['id', 'firstName', 'lastName']
        },
        {
            model: User,
            as: 'recipient',
            attributes: ['id', 'firstName', 'lastName']
        }],
        attributes: {
            exclude: ['updatedAt']
        },
        order: [['createdAt', 'ASC']]
    })
    res.json(replies)
})

router.get('/', requireAuth, async (req, res) => {
    const user = await User.findByPk(parseInt(req.user.id))
    const inbox = await Message.findAll({
        where: {
            [Op.or]: [
                { fromId: user.id },
                { toId: user.id }
            ]
        },
        include: [{
            model: User,
            as: 'sender',
            attributes: ['id', 'firstName', 'lastName']
        },
        {
            model: User,
            as: 'recipient',
            attributes: ['id', 'firstName', 'lastName']
        }],
        attributes: {
            exclude: ['updatedAt']
        },
    })

    res.json(inbox)
})

router.post('/send', requireAuth, async (req, res) => {
    const message = await Message.create({
        fromId: req.user.id,
        ...req.body
    }, { validate: true })
    res.json(message)
})

router.delete('/:messageId', requireAuth, async (req, res) => {
    const doomedMessage = await Message.findByPk(req.params.messageId)
    if (req.user.id === doomedMessage.toId) {
        await doomedMessage.destroy();
        res.json({ message: 'Successfully deleted' })
    }
    else {
        res.status(401).json({ message: 'You are not authorized to delete this message' })
    }
})



module.exports = router;
