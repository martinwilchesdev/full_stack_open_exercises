import ReactDOM from 'react-dom/client'
import appComponent from './App.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
    root.render(<appComponent.App />)
}

renderApp()

const store = appComponent.store
store.subscribe(renderApp)