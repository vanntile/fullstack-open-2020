import React from 'react'

export const Numbers = ({ persons, filter, deletePerson }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons
          .filter(({ name }) => name.toLowerCase().includes(filter.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()))
          .map(({ id, name, number }) => (
            <li key={id}>
              {name}: {number} <button onClick={() => deletePerson(id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  )
}
