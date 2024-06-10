import axios from 'axios'
import { useState, useEffect } from 'react'

// components
import CountryInfo from './components/CountryInfo'

const App = () => {
  const [message, setMessage] = useState(null)
  const [countries, setCountries] = useState([])
  const [countryInfo, setCountryInfo] = useState(null)
  const [showCountries, setShowCountries] = useState([])

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const onHandleSearchCountries = (e) => {
    const searchCountry = e.target.value?.trim()

    if (searchCountry) {
      const filterCountries = countries.filter(country => {
        if (country.name.common.toLowerCase().includes(searchCountry.toLowerCase())) {
          return country
        }
      })

      if (filterCountries.length >= 10) {
        setMessage('Too many matches, specify another filter')
        setShowCountries([])
      } else if (filterCountries.length === 1) {
        handleShowCountryInfo(...filterCountries)
      } else {
        setShowCountries(filterCountries) 
        setMessage(null)
      }
    } else {
      setShowCountries([])
      setMessage(null)
    }
  }

  const handleShowCountryInfo = (country) => {
    setShowCountries([country])
    setCountryInfo(country)
    setMessage(null)
  }

  if (showCountries.length === 1) {
    return (
      <div>
        <div>
          find countries
          <input onChange={onHandleSearchCountries} />
        </div>
        <CountryInfo country={countryInfo} />
      </div>
    )
  } else {
    return (
      <div>
        <div>
          find countries
          <input onChange={onHandleSearchCountries} />
        </div>
        <ul>
          {
            showCountries.map((country, index) => (
              <li key={index}>{country.name.common} <button onClick={() => handleShowCountryInfo(country)}>show</button></li>
            ))
          }
        </ul>
        {message}
      </div>
    )
  }
}

export default App