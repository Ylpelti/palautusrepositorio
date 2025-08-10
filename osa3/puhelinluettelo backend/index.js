const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

let persons = [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": "1"
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": "2"
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": "3"
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": "4"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const maxId = persons.length>0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0
    const requestTime = new Date().toUTCString();
    
    response.send(`<h2>Phonebook has info for ${maxId} people</h2>
        <p>${requestTime}</p>
        `)
    
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body;

  
  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name or number missing' });
  }

  
  if (persons.some(person => person.name === body.name)) {
    return response.status(400).json({ error: 'name already in phonebook' });
  }

  
  const person = {
    id: Math.floor(Math.random() * 10000),  
    name: body.name,
    number: body.number
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);

})