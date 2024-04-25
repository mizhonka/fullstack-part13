const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { SECRET } = require('../util/config')
const User = require('../models/User')

router.post('/', async (req, res) => {
    const body = req.body

    const user = await User.findOne({ where: { username: body.username } })
    const passwordMatch = body.password == 'secret'

    if (!(user && passwordMatch)) {
        return res.status(401).json({ error: 'Incorrect username or password' })
    }

    const userForToken = {
        username: user.username,
        id: user.id,
    }

    const token = jwt.sign(userForToken, SECRET)

    res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router
