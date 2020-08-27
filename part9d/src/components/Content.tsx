import React from 'react'
import { Part } from './Part'
import { CoursePart } from '../types'

interface ContentProps {
  courseParts: CoursePart[]
}

export const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((c, i) => (
        <div key={`${c.name}${i}`}>
          <Part part={c} />
        </div>
      ))}
    </div>
  )
}
