require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Phonebook = require('./phonebook')

const PORT = process.env.PORT

morgan.token('body', function (req, res) {
  return Object.keys(req.body).length !== 0 ? `- ${JSON.stringify(req.body)}` : ' '
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (error, request, response, next) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(unknownEndpoint) // handler of requests with unknown endpoint
app.use(errorHandler)

app.get('/api/info', (request, response) => {
  Phonebook.find({}).then((result) => {
    response.end(`Your phonebook has ${result.length} contacts.\n${new Date()}`)
  })
})

app.get('/api/persons', (_, response) => {
  Phonebook.find({}).then((result) => {
    response.json(result)
  })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body) return response.status(400).json({ error: 'content missing' })
  if (!body.name) return response.status(400).json({ error: 'Name missing' })
  if (!body.number) return response.status(400).json({ error: 'Number missing' })

  const person = new Phonebook({
    name: body.name || '',
    number: body.number || '',
  })

  person
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedAndFormattedPerson) => {
      response.json(savedAndFormattedPerson)
    })
    .catch((error) => next(error))
})

app.get('/api/person/:id', (request, response, next) => {
  Phonebook.findById(request.params.id)
    .then((entry) => {
      if (entry) {
        response.json(entry)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.put('/api/person/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Phonebook.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((entry) => {
      response.json(entry)
    })
    .catch((error) => next(error))
})

app.delete('/api/person/:id', (request, response, next) => {
  Phonebook.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
