import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonsForm from './components/PersonsForm'

import { useState, useEffect } from 'react'

import setPerson from './services/persons'

const App = () => {
    const [filterPersons, setFilterPersons] = useState([])
    const [personInfo, setPersonInfo] = useState({
        name: '',
        number: '',
    })
    const [persons, setPersons] = useState([])
    const [name, setName] = useState('')

    useEffect(() => {
        setPerson.getAll()
            .then(data => {
                setPersons(persons.concat(data))
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

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

            const existPerson = persons.find((person) => person.name === personInfo.name)

            if (
                existPerson !== undefined
            ) {
                if (window.confirm(`${personInfo.name} is already added to phonebook, replace the old number with a new one?`)) {
                    setPerson.update(newObject, existPerson.id)
                        .then(data => {
                            setPersons(persons.map(p => {
                                if (p.id == data.id) {
                                    return data
                                }
                                return p
                            }))
                        })
                }
            } else {
                setPerson.create(newObject)
                    .then(data => {
                        setPersons(persons.concat(data))
                    })
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

    const handleDeletePerson = (person) => {
        if (window.confirm(`Delete ${person.name} ?`)) {
            setPerson.remove(person)
                .then(data => {
                    setPersons(persons.filter(p => p.id != data.id))
                })
        }
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
            <Persons persons={name != '' ? filterPersons : persons} onDeletePerson={handleDeletePerson} />
        </div>
    )
}

export default App
