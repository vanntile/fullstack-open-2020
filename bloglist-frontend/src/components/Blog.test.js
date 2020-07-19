import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import axios from 'axios'
import React from 'react'
import { Blog } from './Blog'

jest.mock('axios')

const blog = {
  id: 1,
  title: 'Interesting title',
  author: 'me',
  url: 'interesting-title',
  likes: 5,
}

test('renders content', () => {
  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent(blog.title)
})

test('blog does not render hidden data', () => {
  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)

  const likes = component.getByText(`likes: ${blog.likes}`).parentElement
  expect(likes).toHaveStyle('display: none')

  const url = component.getByText(blog.url).parentElement
  expect(url).toHaveStyle('display: none')
})

test('blog reveals hidden data', () => {
  const component = render(<Blog blog={blog} />)

  const button = component.getByText('view')
  fireEvent.click(button)

  const likes = component.getByText(`likes: ${blog.likes}`).parentElement
  expect(likes).not.toHaveStyle('display: none')

  const url = component.getByText(blog.url).parentElement
  expect(url).not.toHaveStyle('display: none')
})

test('blog like button event', async () => {
  const updateBlog = jest.fn()

  axios.put.mockImplementation(() => Promise.resolve({ data: blog }))

  const component = render(<Blog blog={blog} updateBlog={updateBlog} />)

  const button = component.getByText('view')
  fireEvent.click(button)

  const likeButton = component.getByText('like')

  await fireEvent.click(likeButton)
  await fireEvent.click(likeButton)

  setImmediate(() => {
    // this is needed because this onClick is async and it finishes on the next Node tick
    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})
