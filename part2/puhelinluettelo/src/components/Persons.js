import React from "react";
import Person from "./Person";

const Persons = (props) => {
  return (
    <div>
      {props.persons.map((person) => {
        return (
          <Person
            key={person.name}
            person={person}
            removePerson={props.removePerson}
          />
        );
      })}
    </div>
  );
};

export default Persons;
