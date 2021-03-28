import React from "react";

const WeatherCard = ({ country, handleClick }) => {
  return (
    <>
      <p>
        {country.name}{" "}
        <button onClick={() => handleClick(country.name)}>show</button>
      </p>
    </>
  );
};
 
export default WeatherCard;
