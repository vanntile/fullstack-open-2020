const personsRouter = require('express').Router()
const Phonebook = require('../models/Phonebook')

personsRouter.get('/info', (request, response) => {
  Phonebook.find({}).then((result) => {
    response.end(`Your phonebook has ${result.length} contacts.\n${new Date()}`)
  })
})

personsRouter.get('/', (_, response) => {
  Phonebook.find({}).then((result) => {
    response.json(result)
  })
})

personsRouter.post('/', (request, response, next) => {
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

personsRouter.get('/:id', (request, response, next) => {
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

personsRouter.put('/:id', (request, response, next) => {
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

personsRouter.delete('/:id', (request, response, next) => {
  Phonebook.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

module.exports = personsRouter
