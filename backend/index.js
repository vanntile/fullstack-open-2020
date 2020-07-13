const express = require('express')
const { request } = require('express')
const app = express()
const PORT = 3001

app.use(express.json())

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
]

const generateNextId = () => {
  const personIds = persons.map((p) => p.id)
  let newId = Math.floor(Math.random() * 10 ** 6)
  while (personIds.includes(newId)) newId = Math.floor(Math.random() * 10 ** 6)

  return newId
}

app.get('/info', (request, response) => {
  response.end(`Your phonebook has ${persons.length} contacts.\n${new Date()}`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  console.log(body)

  if (!body) return response.status(400).json({ error: 'content missing' })
  if (!body.name) return response.status(400).json({ error: 'Name missing' })
  if (!body.number) return response.status(400).json({ error: 'Number missing' })
  if (persons.find((p) => p.name === body.name)) return response.status(400).json({ error: 'name must be unique' })

  const person = {
    name: body.name,
    number: body.number,
    id: generateNextId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/api/person/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((p) => p.id === id)

  person ? response.json(person) : response.status(404).end()
})

app.delete('/api/person/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((p) => p.id !== id)

  response.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
