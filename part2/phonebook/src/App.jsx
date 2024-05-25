import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '555-555' },
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

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
                persons.find(person => person.name === newName) !== undefined
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
            <div>
                filter shown with <input />
            </div>
            <h2>add new</h2>
            <form>
                <div>
                    name: <input onChange={handleName} />
                </div>
                <div>
                    number: <input onChange={handleNumber} />
                </div>
                <div>
                    <button type="submit" onClick={handleSubmitInfo}>
                        add
                    </button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map((person, index) => (
                    <li key={index}>{person.name} - {person.number}</li>
                ))}
            </ul>
        </div>
    )
}

export default App
