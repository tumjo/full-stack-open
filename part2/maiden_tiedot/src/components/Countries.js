import React from "react";
import Country from "./Country";
import CountryCard from "./CountryCard";

const Countries = ({ filter, countries, handleClick }) => {
  if (!filter || (countries.length <= 10 && countries.length > 1)) {
    return (
      <div>
        {countries.map((country) => (
          <Country
            key={country.alpha3Code}
            country={country}
            handleClick={handleClick}
          />
        ))}
      </div>
    );
  } else if (countries.length === 1) {
    return <CountryCard country={countries[0]} />;
  } else if (countries.length < 1) {
    return <p>No results</p>;
  } else {
    return <p>Too many matches, spesify another filter</p>;
  }
};

export default Countries;
