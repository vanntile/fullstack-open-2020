const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { request, response } = require('express')

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
    url: encodeURI(body.title.toLowerCase().replace(' ', '-')),
    likes: body.likes || 0,
    user: user._id,
  })

  const saved = await blog.save()

  user.blogs = user.blogs.concat(saved._id)
  await user.save()

  response.json(saved)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blogPost = await Blog.findOne({ _id: request.params.id, user: user._id })

  if (!blogPost) {
    response.status(403).json({ error: `The post isn't owned by your account` })
    return
  }

  Blog.findOneAndDelete({ _id: request.params.id })

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blogPost = await Blog.findOne({ _id: request.params.id, user: user._id })

  if (!blogPost) {
    response.status(403).json({ error: `The post isn't owned by your account` })
    return
  }

  const saved = await Blog.findOneAndUpdate(
    { _id: blogPost.id },
    {
      likes: request.body.likes,
      author: request.body.author,
      title: request.body.title || blogPost.title || '',
    },
    {
      new: true,
    },
  )

  response.status(200).json(saved)
})

module.exports = blogsRouter
