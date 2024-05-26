import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonsForm from './components/PersonsForm'

import { useState } from 'react'

const App = () => {
    const [filterPersons, setFilterPersons] = useState([])
    const [personInfo, setPersonInfo] = useState({
        name: '',
        number: '',
    })
    const [persons, setPersons] = useState([])
    const [name, setName] = useState('')

    const handleName = (e) => {
        setPersonInfo({
            ...personInfo,
            name: e.target.value,
        })
    }

    const handleNumber = (e) => {
        setPersonInfo({
            ...personInfo,
            number: e.target.value,
        })
    }

    const handleSubmitInfo = (e) => {
        e.preventDefault()
        if (personInfo.name.trim() !== '' && personInfo.number.trim() !== '') {
            const newObject = {
                name: personInfo.name,
                number: personInfo.number,
            }

            if (
                persons.find((person) => person.name === personInfo.name) !==
                undefined
            ) {
                alert(`${personInfo.name} is already added to phonebook`)
            } else {
                setPersons(persons.concat(newObject))
            }
        }
    }

    const handleFilterPerson = (e) => {
        const newObject = persons.filter((person) => {
            if (
                person.name.toLowerCase().includes(e.target.value.toLowerCase())
            ) {
                return person
            }
        })
        setFilterPersons(newObject)
        setName(e.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter onHandleFilterPerson={handleFilterPerson} />
            <h2>Add new</h2>
            <PersonsForm
                onHandleName={handleName}
                onHandleNumber={handleNumber}
                onHandleSubmitInfo={handleSubmitInfo}
            />
            <h3>Numbers</h3>
            <Persons persons={name != '' ? filterPersons : persons} />
        </div>
    )
}

export default App
