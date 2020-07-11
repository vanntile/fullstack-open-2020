import axios from 'axios'

const URL = 'http://localhost:3001/persons'

const getAll = () => axios.get(`${URL}`).then((response) => response.data)
const addNew = (newPerson) => axios.post(`${URL}`, newPerson).then((response) => response.data)
const remove = (id) => axios.delete(`${URL}/${id}`).then((response) => response.data)
const update = (id, data) => axios.put(`${URL}/${id}`, data).then((response) => response.data)

export default { getAll, addNew, remove, update }
