import axios from 'axios'

const URL = '/api'

const getAll = () => axios.get(`${URL}/persons`).then((response) => response.data)
const addNew = (newPerson) => axios.post(`${URL}/persons`, newPerson).then((response) => response.data)
const remove = (id) => axios.delete(`${URL}/person/${id}`).then((response) => response.data)
const update = (id, data) => axios.put(`${URL}/person/${id}`, data).then((response) => response.data)

export default { getAll, addNew, remove, update }
