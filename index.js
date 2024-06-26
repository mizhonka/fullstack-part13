const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorRouter = require('./controllers/authors')
const entryRouter = require('./controllers/readinglists')
const logoutRouter = require('./controllers/logout')

app.use(express.json())

const errorHandler = (error, _req, res, next) => {
    res.status(400).json({ error: error.message })

    next(error)
}

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorRouter)
app.use('/api/readinglists', entryRouter)
app.use('/api/logout', logoutRouter)
app.use(errorHandler)

const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

start()
