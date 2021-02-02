import React from "react";

const PersonForm = (props) => {
  //console.log(props); 
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.nameValue} onChange={props.handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input value={props.numberValue} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
