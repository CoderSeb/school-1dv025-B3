import React, { useState, useRef } from 'react'
import Geocode from 'react-geocode'
import './styles.css'
import API_KEY from './apikey.json'

const apiKey = API_KEY.key

/**
 * Weather App main function.
 *
 * @param {string} gameID
 * @returns {object}
 */
const WeatherApp = ({ gameID }) => {
  const cityInput = useRef(null)
  Geocode.setApiKey(apiKey)
  Geocode.enableDebug()
  const getWeather = async (city) => {
    try {
      const response = await Geocode.fromAddress(city)
      const { lat, lng } = response.results[0].geometry.location
      console.log(lat, lng)
      const res = await fetch(`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lng.toFixed(5)}/lat/${lat.toFixed(5)}/data.json`)
      const object = await res.json()
      console.log('object???', object)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div id={gameID} className="WeatherApp">
      <h1>Weather App</h1>
      <label htmlFor="cities">Write a city name to get the weather!</label>
      <input id="cities" ref={cityInput}></input>
      <button onClick={() => getWeather(cityInput.current.value)}>Go!</button>
    </div>
  )
}

export default WeatherApp
