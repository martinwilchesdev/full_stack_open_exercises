import Persons from './components/Persons'

import { useState } from 'react'
import PersonsForm from './components/PersonsForm'

const App = () => {
    const [newNumber, setNewNumber] = useState('')
    const [newName, setNewName] = useState('')
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '555-555' },
    ])

    const handleName = (e) => {
        setNewName(e.target.value)
    }

    const handleNumber = (e) => {
        setNewNumber(e.target.value)
    }

    const handleSubmitInfo = (e) => {
        e.preventDefault()
        if (newName.trim() !== '' && newNumber.trim() !== '') {
            const newObject = { name: newName, number: newNumber }

            if (
                persons.find((person) => person.name === newName) !== undefined
            ) {
                alert(`${newName} is already added to phonebook`)
            } else {
                setPersons(persons.concat(newObject))
            }
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <h2>add new</h2>
            <PersonsForm
                onHandleName={handleName}
                onHandleNumber={handleNumber}
                onHandleSubmitInfo={handleSubmitInfo}
            />
            <h3>Numbers</h3>
            <Persons persons={persons} />
        </div>
    )
}

export default App
