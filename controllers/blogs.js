const router = require('express').Router()

const Blog = require('../models/Blog')

router.get('/', async (_req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

router.post('/', async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body)
        return res.json(newBlog)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id)
        blog.destroy()
        res.status(204).end()
    } catch (error) {
        res.status(400).json({ error: 'id not found' })
    }
})

module.exports = router
