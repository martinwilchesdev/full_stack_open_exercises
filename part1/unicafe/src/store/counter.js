import counterReducer from '../reducer/counter'
import { createStore } from 'redux'

const store = createStore(counterReducer)

export default store