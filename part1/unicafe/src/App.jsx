import Stadistics from './components/Stadistics'
import Button from './components/Button'
import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onHandleStadistic={handleGood} text="good" />
        <Button onHandleStadistic={handleNeutral} text="neutral" />
        <Button onHandleStadistic={handleBad} text="bad" />
      </div>
      <Stadistics 
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App