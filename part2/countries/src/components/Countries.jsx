const Countries = ({ countries, handleShow, weather }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (countries.length === 1) {
    const country = countries[0];

    return (
      <div>
        <h1>
          {country.name.common} {country.flag}{' '}
        </h1>
        <div>capital: {country.capital}</div>
        <div>population: {country.population}</div>
        <h2>languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.svg} alt="flag" width="100" />
        {weather ? (
          <div>
            <h2>Weather in {country.capital}</h2>
            <p>Temperature: {weather.main.temp} °C</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>Weather: {weather.weather[0].description}</p>
            <p>Wind speed: {weather.wind.speed} m/s</p>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    );
  }

  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.common}>
          {country.name.common}{' '}
          <button onClick={() => handleShow(country)}>show</button>
        </div>
      ))}
    </div>
  );
};

export default Countries;
