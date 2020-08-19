import React from 'react'
import { useDispatch } from 'react-redux'
import { updateFilterAction } from '../reducers/filterReducer'

export const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    dispatch(updateFilterAction(event.target.value))
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}
