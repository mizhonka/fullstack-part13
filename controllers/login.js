const { v1 } = require('uuid')

const router = require('express').Router()
const { User, Session } = require('../models')

router.post('/', async (req, res) => {
    const body = req.body

    const user = await User.findOne({ where: { username: body.username } })
    const passwordMatch = body.password == 'secret'

    if (!(user && passwordMatch)) {
        return res.status(401).json({ error: 'Incorrect username or password' })
    }

    if (user.disabled) {
        return res.status(401).json({ error: 'This user is disabled' })
    }

    const token = v1()

    await Session.create({ userId: user.id, token: token })

    res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router
