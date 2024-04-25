const router = require('express').Router()

const Blog = require('../models/Blog')

const blogFinder=async (req,_res,next)=>{
    req.blog=await Blog.findByPk(req.params.id)
    next()
}

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

router.delete('/:id', blogFinder ,async (req, res) => {
    try {
        req.blog.destroy()
        res.status(204).end()
    } catch (error) {
        res.status(400).json({ error: 'id not found' })
    }
})

router.put('/:id', blogFinder, async(req, res)=>{
    try{
        req.blog.likes+=1
        await req.blog.save()
        return res.json({likes: req.blog.likes})
    }
    catch(error){
        return res.status(400).json({ error })
    }
})

module.exports = router
