import Countries from './components/Countries';
import { useState, useEffect } from 'react';
import countriesService from './services/countries';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countriesService.getAll().then((countries) => {
      setCountries(countries);
    });
  }, []);

  useEffect(() => {
    const results = countries.filter(
      (country) =>
        country.name.common &&
        country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCountries(results);
  }, [search, countries]);

  const handleShow = (country) => {
    setSearch(country.name.common);
    setFilteredCountries([country]);
    getWeather(country);
  };

  const getWeather = (country) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${apiKey}&units=metric`;

    axios
      .get(baseUrl)
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  };

  return (
    <div>
      find countries{' '}
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <Countries
        countries={filteredCountries}
        handleShow={handleShow}
        weather={weather}
      />
    </div>
  );
};

export default App;
