import counterReducer from './store/counter'
import { createStore } from 'redux'

import Stadistics from './components/Stadistics'
import Button from './components/Button'

const store = createStore(counterReducer)

const App = () => {
  const handleGood = () => {
    store.dispatch({type: 'GOOD'})
  }

  const handleNeutral = () => {
    store.dispatch({type: 'OK'})
  }

  const handleBad = () => {
    store.dispatch({type: 'BAD'})
  }

  const handleReset = () => {
    store.dispatch({type: 'ZERO'})
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onHandleStadistic={handleNeutral} text="ok" />
        <Button onHandleStadistic={handleGood} text="good" />
        <Button onHandleStadistic={handleBad} text="bad" />
        <Button onHandleStadistic={handleReset} text="reset stats" />
      </div>
      <Stadistics
        neutral={store.getState().ok}
        good={store.getState().good}
        bad={store.getState().bad}
      />
    </div>
  )
}

export default { App, store }