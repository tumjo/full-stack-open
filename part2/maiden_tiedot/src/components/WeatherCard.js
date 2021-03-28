import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherCard = ({ city }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

  const [weatherData, setWeatherData] = useState("");

  useEffect(() => {
    axios.get(url).then((response) => {
      //console.log("promise fulfilled", response);
      setWeatherData(response.data);
    });
  }, [url]);
  //console.log("api_key:", api_key, "weather: ", weatherData)

  if (!weatherData) {
    return <p>Loading....</p>;
  }
  return (
    <>
      <h4>Weather in {city}</h4>
      <p>Temperature: {weatherData.main.temp} Celsius</p>
      <p>Atmospheric pressure: {weatherData.main.pressure} hPa</p>
      <p>Humidity {weatherData.main.humidity} %</p>
      <img
        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt="weather icon"
        height="80"
        width="80"
      ></img>
      <p>
        Wind speed: {weatherData.wind.speed} m/s direction{" "}
        {weatherData.wind.deg}
      </p>
    </>
  );
};

export default WeatherCard;
