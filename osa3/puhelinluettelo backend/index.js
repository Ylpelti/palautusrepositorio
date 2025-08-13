require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
console.log('verisio 1.0.2 käynnistyyy')
let persons = [
  {
    'name': 'Arto Hellas',
    'number': '040-123456',
    'id': '1'
  },
  {
    'name': 'Ada Lovelace',
    'number': '39-44-5323523',
    'id': '2'
  },
  {
    'name': 'Dan Abramov',
    'number': '12-43-234345',
    'id': '3'
  },
  {
    'name': 'Mary Poppendieck',
    'number': '39-23-6423122',
    'id': '4'
  }
]


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  const maxId = persons.length>0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0
  const requestTime = new Date().toUTCString()

  response.send(`<h2>Phonebook has info for ${maxId} people</h2>
        <p>${requestTime}</p>
        `)

})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number
  })
  console.log(person)
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)

})