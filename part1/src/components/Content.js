import React from 'react'

import { Part } from './Part'

export const Content = (props) => [
  <Part key="1" part={props.part1} exercises={props.exercises1} />,
  <Part key="2" part={props.part2} exercises={props.exercises2} />,
  <Part key="3" part={props.part3} exercises={props.exercises3} />,
]
