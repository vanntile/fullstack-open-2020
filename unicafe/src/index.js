import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Helpers

const sum = (array) => array.reduce((a, b) => a + b)
const average = (array) => sum(array) / array.length
const trim = (x) => Math.floor(x * 100) / 100

// Components

const Button = ({ name, update }) => <button onClick={update}>{name}</button>

const Feedback = ({ buttons }) => (
  <div>
    <h1>Give feedback</h1>
    {buttons.map((b, i) => (
      <Button key={i} {...b} />
    ))}
  </div>
)

const Statistic = ({ name, value, idx }) => (
  <p>
    {name}: {value}
  </p>
)

const Statistics = ({ states }) => (
  <div>
    <h1>Statistics</h1>
    {states.map((s, i) => (
      <Statistic key={i} {...s} />
    ))}
    <p>
      average:{' '}
      {trim(
        average(
          states.map(({ name, value }) => {
            switch (name) {
              case 'good':
                return value
              case 'bad':
                return -value
              default:
                return 0
            }
          }),
        ),
      )}
    </p>
    <p>
      positive:{' '}
      {trim(((states.find((s) => s.name === 'good')?.value || 0) / (sum(states.map(({ value }) => value)) || 1)) * 100)}
      %
    </p>
  </div>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const buttons = [
    { name: 'good', update: () => setGood(good + 1) },
    { name: 'neutral', update: () => setNeutral(neutral + 1) },
    { name: 'bad', update: () => setBad(bad + 1) },
  ]
  const states = [
    { name: 'good', value: good },
    { name: 'neutral', value: neutral },
    { name: 'bad', value: bad },
  ]

  if (!sum(states.map(({ value }) => value))) {
    return <Feedback buttons={buttons} />
  }

  return (
    <div>
      <Feedback buttons={buttons} />
      <Statistics states={states} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
