import React from 'react'

export const AddEntry = ({ newName, newNumber, handleSubmit, handleChange }) => {
  return (
    <div>
      <h3>Add new number:</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input type="text" name="name" onChange={handleChange} value={newName} />
        </div>
        <div>
          number: <input type="text" name="phone" onChange={handleChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}
