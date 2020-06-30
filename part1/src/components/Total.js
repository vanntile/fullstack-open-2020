import React from 'react'

export const Total = ({ course: { parts } }) => (
  <p>Number of exercises {parts.map((p) => p.exercises).reduce((s, c) => s + c, 0)}</p>
)
