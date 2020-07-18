const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    author: 'Author 1',
    title: 'title 1',
    likes: '1',
  },
  {
    author: 'Author 2',
    title: 'title 2',
    likes: '2',
  },
]

beforeEach(async () => {
  await Blog.deleteMany()

  await Promise.all(initialBlogs.map((b) => Blog(b).save()))
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct number of blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
