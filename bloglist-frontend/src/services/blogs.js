import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const postNew = async (newPost) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newPost, config)
  return response.data
}

const like = async ({ id, likes }) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.put(`${baseUrl}/${id}`, { likes }, config)
  return response.data
}

const deletePost = async ({ id }) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default {
  setToken,
  getAll,
  postNew,
  like,
  deletePost,
}
