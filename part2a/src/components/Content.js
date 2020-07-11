import React from 'react'

import { Part } from './Part'

export const Content = ({ course: { parts } }) => parts.map((p, i) => <Part key={i} {...p} />)
