import React, { useState, useEffect } from 'react'
import S from './services/service'

import { Filter } from './Filter'
import { AddEntry } from './AddEntry'
import { Numbers } from './Numbers'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  const hook = () => {
    S.getAll().then((r) => setPersons(r))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (e.target.name === '') return
    const existing = persons.find((p) => p.name === newName)

    existing
      ? S.update(existing.id, { ...existing, number: newNumber }).then((response) => {
          setPersons(persons.map((p) => (p.id === existing.id ? response : p)))
        })
      : S.addNew({
          name: newName,
          number: newNumber,
        }).then((response) => {
          setPersons(persons.concat(response))
        })

    setNewName('')
    setNewNumber('')
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
      .catch((e) => console.error(e))
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter {...{ filter, handleFilter }} />
      <AddEntry {...{ newName, newNumber, handleSubmit, handleChange }} />
      <Numbers {...{ filter, persons, deletePerson }} />
    </div>
  )
}

export default App
