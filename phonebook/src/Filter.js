import React from 'react'

export const Filter = ({ filter, handleFilter }) => {
  return (
    <form onSubmit={handleFilter}>
      Find: <input type="text" name="find" onChange={handleFilter} value={filter} />
    </form>
  )
}

// export default Filter
