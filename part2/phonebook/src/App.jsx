import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phoneService from './services/phonebook';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState({ content: null, type: '' });

  useEffect(() => {
    phoneService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setFilteredPersons(initialPersons);
    });
  }, []);

  const showMessage = (content, type) => {
    setMessage({ content, type });
    setTimeout(() => setMessage({ content: null, type: '' }), 5000);
  };

  const handleFilterChange = (e) => {
    const filter = e.target.value.toLowerCase();
    setFilteredPersons(
      persons.filter((person) => person.name.toLowerCase().includes(filter))
    );
  };

  const handlePersonSubmit = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const personExists = persons.some((p) => p.name === newName);

    if (personExists) {
      const person = persons.find((p) => p.name === newName);
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number?`
        )
      ) {
        handleUpdate(person.id, newPerson);
      }
    } else {
      phoneService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setFilteredPersons(persons.concat(returnedPerson));
          showMessage(`Added ${newName}`, 'success');
        })
        .catch((error) => {
          showMessage(
            `Error: ${error.response?.data?.error || 'Failed to add person'}`,
            'error'
          );
        });
    }
    setNewName('');
    setNewNumber('');
  };

  const handleUpdate = (id, newPerson) => {
    phoneService
      .update(id, newPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) => (person.id !== id ? person : returnedPerson))
        );
        setMessage({ content: `Updated ${newPerson.name}`, type: 'success' });
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setMessage({
            content: `Error: Information of ${newPerson.name} has already been removed from server`,
            type: 'error',
          });
          setPersons(persons.filter((p) => p.id !== id)); // Actualizamos el estado local
        } else {
          setMessage({
            content: `Error: Could not update ${newPerson.name}. Please try again.`,
            type: 'error',
          });
        }
      })
      .finally(() => {
        setTimeout(() => setMessage({ content: null, type: '' }), 5000); // Limpiamos el mensaje
      });
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      phoneService
        .deletePerson(id)
        .then(() => {
          const updatedPersons = persons.filter((p) => p.id !== id);
          setPersons(updatedPersons);
          setFilteredPersons(updatedPersons);
          showMessage(`Deleted ${person.name}`, 'success');
        })
        .catch(() => {
          showMessage(
            `${person.name} was already removed from the server`,
            'error'
          );
          setPersons(persons.filter((p) => p.id !== id));
          setFilteredPersons(filteredPersons.filter((p) => p.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handleFilterChange={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={(e) => setNewName(e.target.value)}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
        addPerson={handlePersonSubmit}
      />

      <h2>Persons</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
