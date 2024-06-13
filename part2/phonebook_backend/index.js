const express = require('express')
const morgan = require('morgan')
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

// logger morgan personalizado
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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
app.post('/api/notes', (req, res) => {
    const body = req.body
    const id = Math.max(...persons.map(person => person.id))

    body.id = id + 1
    persons = persons.concat(body)

    res.status(201).end()
    // morgan.token('tiny', function (req, res) { return req.headers['content-type'] })
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})