const express = require('express')
const cors = require('cors')
const app = express()

// modelo Person mongoose
const Person = require('./models/people')

let persons = []

app.use(express.json())
app.use(cors())

app.use(express.static('dist'))

// obtener todos los recursos
app.get('/api/persons', (req, res) => {
    Person.find({})
        .then(people => {
            res.json(people)
        })
        .catch(error =>
            console.log(error)
        )
})

app.get('/api/info', (req, res) => {
    Person.find({})
        .then(people => {
            res.send(`
                <p>Phonebook has info for ${people.length} people</p>
                <p>${new Date}</p>
            `)
        })
})

// obtener un recurso individual
app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => {
            console.log('Error:', error.message)
        })
})

// eliminar un recurso individual
app.delete('/api/persons/:id', (req, res) => {
    const request_id = Number(req.params.id)
    persons = persons.filter(person => person.id !== request_id)

    res.status(204).end()
})

// crear un nuevo recurso
app.post('/api/persons', (req, res) => {
    console.log('create new person')
    const body = req.body
    if (!body.name) return res.status(400).send({ error: 'field name cannot be empty' })
    Person.find({ name: body.name })
        .then(person => {
            if (person.length > 0) {
                res.status(400).send({ error: 'name must be unique' })
            } else {
                const person = new Person({
                    name: body.name,
                    number: body.number
                })

                person.save()
                    .then(person => {
                        res.status(201).json(person)
                    })
            }
        })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
