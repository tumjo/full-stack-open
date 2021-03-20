import "./App.css";
import React, { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import FilterForm from "./components/FilterForm";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState({
    message: null,
    type: null,
  });

  const showMessage = (message, type) => {
    setNotificationMessage({ message, type });
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  useEffect(() => {
    personService
      .getAll()
      .then((responseData) => {
        setPersons(responseData);
      })
      .catch((error) => {
        showMessage(`Network Error`, "error");
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const findPerson = persons.find((person) => person.name === newName);
        const changedPerson = { ...findPerson, number: newNumber };
        personService
          .update(changedPerson.id, changedPerson)
          .then((responseData) => {
            showMessage(
              `'${changedPerson.number}' added successfully`,
              "success"
            );
            setPersons(
              persons.map((person) =>
                person.id !== changedPerson.id ? person : responseData
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            showMessage(
              `the person '${changedPerson.name}' was already deleted from server. ${error}`,
              "error"
            );
            const filteredPersons = persons.filter((person) => {
              return person.id !== changedPerson.id;
            });
            setPersons(filteredPersons);
          });
      }
    } else {
      personService.create(nameObject).then((responseData) => {
        showMessage(`'${responseData.name}' added successfully`, "success");
        setPersons(persons.concat(responseData));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const removePerson = (person) => {
    const id = person.id;
    if (window.confirm(`Delete ${person.name}?`)) {
      const filteredPersons = persons.filter((person) => {
        return person.id !== id;
      });
      personService
        .remove(id)
        .then(() => {
          showMessage(`'${person.name}' deleted successfully`, "success");
        })
        .catch((error) => {
          showMessage(
            `The person '${person.name}' was already deleted from server. ${error}`,
            "error"
          );
        })
        .finally(() => {
          setPersons(filteredPersons);
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const personsToShow = !newFilter
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <FilterForm
        filterValue={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        nameValue={newName}
        numberValue={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} removePerson={removePerson} />
    </div>
  );
};

export default App;
