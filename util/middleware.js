const { Session } = require('../models')

const tokenExtractor = async (req, res, next) => {
    const authorization = req.get('authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        req.decodedToken = await Session.findOne({
            where: {
                token: authorization.substring(7),
                valid: true,
            },
        })
        if (!req.decodedToken) {
            return res.status(401).json({ error: 'token invalid' })
        }
    } else {
        return res.status(401).json({ error: 'token missing' })
    }
    next()
}

module.exports = { tokenExtractor }
