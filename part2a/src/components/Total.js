import React from 'react'

export const Total = ({ course: { parts } }) => (
  <p>
    <b>Number of exercises {parts.map((p) => p.exercises).reduce((s, c) => s + c, 0)}</b>
  </p>
)
