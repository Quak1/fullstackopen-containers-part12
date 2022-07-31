import { useState, useEffect } from "react";
import personService from "./services/Persons";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import "./style.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data));
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    if (verifyDuplicate()) return;

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService
      .create(newPerson)
      .then((data) => {
        setPersons(persons.concat(data));
        setNewName("");
        setNewNumber("");
        setNotification(`Addedd ${data.name}`);
        setTimeout(() => setNotification(null), 5000);
      })
      .catch((e) => {
        setErrorMessage(e.response.data.error);
        setTimeout(() => setErrorMessage(null), 5000);
      });
  };

  const verifyDuplicate = () => {
    const duplicate = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (!duplicate) return false;

    const msg =
      duplicate.name +
      " is already added to phonebook, " +
      "replace the old number with a new one?";

    if (window.confirm(msg)) {
      const updatedPerson = {
        ...duplicate,
        number: newNumber,
      };

      personService
        .updateNumber(updatedPerson)
        .then((data) => {
          setPersons(
            persons.map((person) => (person.id !== data.id ? person : data))
          );
          setNotification(`${data.name}'s phone number updated`);
          setTimeout(() => setNotification(null), 5000);
        })
        .catch((e) => {
          setErrorMessage(e.response.data.error);
          setTimeout(() => setErrorMessage(null), 5000);
        });
    }
    return true;
  };

  const deletePerson = (person) => () => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter((p) => person.id !== p.id));
          setNotification(`${person.name} deleted from server`);
          setTimeout(() => setNotification(null), 5000);
        })
        .catch(() => {
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`
          );
          setTimeout(() => setErrorMessage(null), 5000);
          setPersons(persons.filter((p) => p.id !== person.id));
        });
    }
  };

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);

  const personsShown = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage} type="error" />
      <Notification message={notification} type="success" />
      <Filter value={filter} onChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm
        name={{ value: newName, onChange: handleNameChange }}
        number={{ value: newNumber, onChange: handleNumberChange }}
        onSubmit={addPerson}
      />

      <h2>Numbers</h2>
      <Persons persons={personsShown} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
