import "./App.css";
import React, { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import FilterForm from "./components/FilterForm";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  //console.log(persons);

  useEffect(() => {
    personService.getAll().then((responseData) => {
      setPersons(responseData);
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
          `${newName} is already added to phonebook, replace the old number with anew one?`
        )
      ) {
        const findPerson = persons.find((person) => person.name === newName);
        const changedPerson = { ...findPerson, number: nameObject.number };
        personService
          .update(changedPerson.id, changedPerson)
          .then((responseData) => {
            setPersons(
              persons.map((person) =>
                person.id !== changedPerson.id ? person : responseData
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            alert(
              `the person '${changedPerson.name}' was already deleted from server. ${error}`
            );
            const filteredPersons = persons.filter((person) => {
              return person.id !== changedPerson.id;
            });
            setPersons(filteredPersons);
          });
      }
    } else {
      personService.create(nameObject).then((responseData) => {
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
          setPersons(filteredPersons);
        })
        .catch((error) => {
          alert(
            `the person '${person.name}' was already deleted from server. ${error}`
          );
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

  const personsToShow =
    newFilter.length < 0
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(newFilter.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
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
