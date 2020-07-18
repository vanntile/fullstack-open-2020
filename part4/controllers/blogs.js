const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { request } = require('express')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title || '',
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const saved = await blog.save()

  user.blogs = user.blogs.concat(saved._id)
  await user.save()

  response.json(saved)
})

blogsRouter.delete('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blogPost = await Blog.find({ id: request.params.id })

  if (user._id !== blogPost.userId) {
    response.status(403).end()
  }

  response.status(204).end()
})

module.exports = blogsRouter
