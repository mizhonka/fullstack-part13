const router = require('express').Router()

const { Session } = require('../models')

const { tokenExtractor } = require('../util/middleware')

router.delete('/', tokenExtractor, async (req, res) => {
    await Session.destroy({
        where: {
            userId: req.decodedToken.userId,
        },
    })

    res.status(200).send({ message: 'logged out successfully' })
})

module.exports = router
