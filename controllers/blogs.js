const router = require('express').Router()
const { Op } = require('sequelize')

const { Blog, User } = require('../models')

const { tokenExtractor } = require('../util/middleware')

const blogFinder = async (req, _res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll({
        include: { model: User, attributes: { exclude: ['userId'] } },
        where: {
            [Op.or]: [
                {
                    title: {
                        [Op.substring]: req.query.search
                            ? req.query.search
                            : '',
                    },
                },
                {
                    author: {
                        [Op.substring]: req.query.search
                            ? req.query.search
                            : '',
                    },
                },
            ],
        },
        order: [['likes', 'DESC']],
    })
    res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const newBlog = await Blog.create({ ...req.body, userId: user.id })
        return res.json(newBlog)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', tokenExtractor, blogFinder, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        if (!(user.id === req.blog.userId)) {
            return res.status(401).json({ error: 'not authorized' })
        }
        req.blog.destroy()
        res.status(204).end()
    } catch (error) {
        next(error)
    }
})

router.put('/:id', blogFinder, async (req, res, next) => {
    try {
        req.blog.likes += 1
        await req.blog.save()
        return res.json({ likes: req.blog.likes })
    } catch (error) {
        next(error)
    }
})

module.exports = router
