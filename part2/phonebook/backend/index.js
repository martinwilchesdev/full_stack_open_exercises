const express = require('express')
const cors = require('cors')
const app = express()

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.use(express.json())
app.use(cors())

app.use(express.static('dist'))

// obtener todos los recursos
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date}</p>
    `)
})

// obtener un recurso individual
app.get('/api/persons/:id', (req, res) => {
    const request_id = Number(req.params.id)
    const person = persons.find(person => person.id === request_id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

// eliminar un recurso individual
app.delete('/api/persons/:id', (req, res) => {
    const request_id = Number(req.params.id)
    persons = persons.filter(person => person.id !== request_id)

    res.status(204).end()
})

// crear un nuevo recurso
app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name) return res.status(400).send({ error: 'field name cannot be empty' })
    if (persons.find(person => person.name === body.name)) return res.status(400).send({ error: 'name must be unique' })

    body.id = persons.length > 0 ? Math.max(...persons.map(person => person.id)) + 1 : 1
    persons = persons.concat(body)

    res.status(201).end()
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
