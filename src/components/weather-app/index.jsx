import React, { useState } from 'react'
import './styles.css'
import cityPos from './citypos.json'

/**
 * Weather App main function.
 *
 * @param {string} gameID
 * @returns {object}
 */
const WeatherApp = ({ gameID }) => {
  const [city, setCity] = useState('Borås')
  const citiesPos = cityPos

  const getWeather = async () => {
    try {
      // http://opendata.smhi.se/apidocs/metfcst/index.html
      const response = await fetch('https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/12.9401/lat/57.72101/data.json')
      if (!response.ok) {
        throw new Error(response.status)
      }
      const object = await response.json()
      console.log(object)
    } catch (err) {
      console.log(err)
    }
  }
  getWeather()
  return (
    <div id={gameID} className="WeatherApp">
      <h1>Weather App</h1>
      <label htmlFor="cities">Select a city:</label>
      <select id="cities">
      // Fortsätt här
        <option value="Borås">Borås</option>
        <option value="Göteborg">Göteborg</option>
        <option value="Kalmar">Kalmar</option>
      </select>
    </div>
  )
}

export default WeatherApp
