const router = require('express').Router()

const { User } = require('../models')

router.get('/', async (_req, res) => {
    const users = await User.findAll()
    res.json(users)
})

router.post('/', async (req, res, next) => {
    try {
        const newUser = await User.create(req.body)
        return res.json(newUser)
    } catch (error) {
        next(error)
    }
})

router.put('/:username', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { username: req.params.username },
        })
        user.username = req.body['username']
        user.save()
        return res.json(user)
    } catch (error) {
        next(error)
    }
})

module.exports = router
