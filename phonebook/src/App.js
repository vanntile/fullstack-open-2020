import React, { useState, useEffect } from 'react'
import S from './services/service'

import { Filter } from './Filter'
import { AddEntry } from './AddEntry'
import { Numbers } from './Numbers'
import { Notification } from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState({ message: null, styleClass: null })

  const hook = () => {
    S.getAll()
      .then((r) => setPersons(r))
      .catch((e) => handleNotification({ message: e.error, styleClass: 'notificationbad' }))
  }

  const handleNotification = (notification, duration = 2500) => {
    setErrorMessage(notification)
    setTimeout(() => {
      setErrorMessage({ message: null, styleClass: null })
    }, duration)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (e.target.name === '') return
    const existing = persons.find((p) => p.name === newName)

    existing
      ? S.update(existing.id, { ...existing, number: newNumber })
          .then((response) => {
            setPersons(persons.map((p) => (p.id === existing.id ? response : p)))
          })
          .catch((e) => handleNotification({ message: e.error, styleClass: 'notificationbad' }))
      : S.addNew({
          name: newName,
          number: newNumber,
        })
          .then((response) => {
            setPersons(persons.concat(response))
          })
          .catch((e) => handleNotification({ message: e.error, styleClass: 'notificationbad' }))

    setNewName('')
    setNewNumber('')
    handleNotification({
      message: `"${newName}" created`,
      styleClass: 'notificationgood',
    })
  }

  const handleChange = (e) => {
    e.target.name === 'name' ? setNewName(e.target.value) : setNewNumber(e.target.value)
  }

  const handleFilter = (e) => {
    setNewFilter(e.target.value)
  }

  const deletePerson = (id) => {
    S.remove(id)
      .then((r) => setPersons(persons.filter((p) => p.id !== id)))
      .catch((e) => {
        handleNotification({ message: `Error: "${id}" cannot be removed`, styleClass: 'notificationbad' })
      })
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification {...errorMessage} />
      <Filter {...{ filter, handleFilter }} />
      <AddEntry {...{ newName, newNumber, handleSubmit, handleChange }} />
      <Numbers {...{ filter, persons, deletePerson }} />
    </div>
  )
}

export default App
