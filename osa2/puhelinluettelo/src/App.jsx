
import { useState, useEffect } from 'react'
import './index.css'
import PersonForm from './components/PersonForm'
import personsService from './services/persons'

const Filter = ({handleFilter}) => {
  return (
  <form >
    <div>
      filter shown with <input type="text" onChange={handleFilter}/>
    </div>
  </form>
  )
}

const Notification = ({message, type}) => {
  if (message === null) {
    return null
  }
  return (
    <div className={type}>
        {message}
    </div>
  )
}


const Persons = ({namesToShow, handleDelete}) => {
  return (
  <div>
    <h2>Numbers</h2>
      
        {namesToShow.map((person, index) => <p key={index}>{person.name} {person.number} {}
          <button type='submit' id={person.id} onClick={() => handleDelete(person.id)} >Delete</button>
        </p>)}
        
  </div>
)}




const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [messagetype, setMessagetype] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    
    const nameObject = {
      name: newName,
      number: newNumber
    }

    personsService
      .create(nameObject)
      .then(response => {
      setMessage(
      `Added ${nameObject.name} `
    )
      setMessagetype('added')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')

      })
      .catch(error => {
        setMessage(error.response.data.error)
        setMessagetype('error')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    

  }

  const handleDelete = (id) => {
  const person = persons.find(p => p.id === id)
  if (!window.confirm(`Delete ${person.name}?`)) return


    personsService
      .remove(id)
      .then(() => {
        setMessage(`${persons.find(p => p.id === id)?.name} deleted`)
        setMessagetype('error')
        setPersons(prevPersons => prevPersons.filter(person => person.id !== id))
        setTimeout(() => setMessage(null), 5000)
      } 
      
      )
      .catch(error => {
        console.log('Error deletinf person', error);
      })

  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handeNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const namesToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messagetype} />
      <Filter handleFilter={handleFilter}/>
      <h3>Add a new</h3>
      <PersonForm 
        addName={addName}
        newName={newName}
        handeNameChange={handeNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        />

      <Persons namesToShow={namesToShow} handleDelete={handleDelete}/>
      
    </div>
  )
}

export default App