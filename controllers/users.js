const router = require('express').Router()

const { User, Blog, Entry } = require('../models')

router.get('/', async (_req, res) => {
    const users = await User.findAll({ include: { model: Blog } })
    res.json(users)
})

router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        attributes: ['name', 'username'],
        include: {
            model: Blog,
            as: 'readings',
            attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
            through: { attributes: [] },
            include: {
                model: Entry,
                attributes: { exclude: ['userId', 'blogId'] },
            },
        },
    })
    res.json(user)
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
