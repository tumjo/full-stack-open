import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import FilterForm from "./components/FilterForm";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      //console.log("promise fulfilled", response);
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const handleClick = (country) => {
    setNewFilter(country);
  };

  const countriesToShow =
    newFilter.length < 0
      ? countries
      : countries.filter((country) =>
          country.name.toLowerCase().includes(newFilter.toLowerCase())
        );

  return (
    <div>
      <h1>Countries</h1>
      <FilterForm
        filterValue={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <Countries
        countries={countriesToShow}
        filter={newFilter}
        handleClick={handleClick}
      />
    </div>
  );
};

export default App;
