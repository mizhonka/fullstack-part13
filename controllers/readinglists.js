const router = require('express').Router()

const { User, Entry } = require('../models')

const { tokenExtractor } = require('../util/middleware')

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

router.put('/:id', tokenExtractor, async (req, res, next) => {
    try {
        const blogId = req.params.id
        const user = await User.findByPk(req.decodedToken.userId)
        const entry = await Entry.findOne({
            where: {
                blogId: blogId,
                userId: user.id,
            },
        })
        entry.read = req.body.read
        entry.save()
        return res.json(entry)
    } catch (error) {
        next(error)
    }
})

module.exports = router
