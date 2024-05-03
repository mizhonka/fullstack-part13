const router = require('express').Router()

const { Entry } = require('../models')

router.post('/', async (req, res, next) => {
    try {
        const newEntry = await Entry.create({
            blogId: req.body.blogId,
            userId: req.body.userId,
        })
        return res.json(newEntry)
    } catch (error) {
        next(error)
    }
})

module.exports = router
