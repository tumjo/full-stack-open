import React from "react";
import WeatherCard from "./WeatherCard";

const CountryCard = ({ country }) => {
  //console.log(country);
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h4>Languages</h4>
      <ul>
        {country.languages.map((language) => {
          return <li key={language.name}>{language.name}</li>;
        })}
      </ul>
      <img
        src={country.flag}
        alt="Flag"
        height="200"
        width="326"
      ></img>
      <WeatherCard city={country.capital} />
    </div>
  );
};

export default CountryCard;
