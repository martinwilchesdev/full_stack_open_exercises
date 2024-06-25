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
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => {
            next(error)
        })
})

// crear un nuevo recurso
app.post('/api/persons', (req, res, next) => {
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
                    // .catch(error => {
                    //     res.status(500).send(error)
                    // })
                    .catch(error => next(error))
            }
        })
})

// actualizar un recurso existente
app.put('/api/persons/:id', (req, res, next) => {
    const person = {
        name: req.body.name,
        number: req.body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true })
        .then(response => {
            if (response) {
                res.json(response)
            } else {
                res.status(500).end()
            }
        })
        .catch(error => next(error))
})

// eliminar un recurso individual
app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id)
        .then(response => {
            res.status(204).end()
        })
})

// middleware a ejecutar cuando el endpoint ingresado no puede ser controlado por la aplicacion
const unknownEndpoints = (req, res, next) => {
    res.status(404).json({error: 'unknown endpoint'})
}

// middleware a ejecutar cuando se se captura un error en los controladores de ruta
const errorHandler = (error, req, res, next) => {
    console.log('Error', error.message)

    if (error.name === 'CastError') {
        res.status(400).json({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        res.status(400).send(error)
    }
}

app.use(unknownEndpoints)
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
