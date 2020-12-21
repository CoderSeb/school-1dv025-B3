import React, { useState, useRef, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
import './styles.css'
import API_KEY from './apikey.json'


const apiKey = API_KEY.weatherkey
const baseUrl = API_KEY.weatherURL

/**
 * Weather App main function.
 *
 * @param {string} gameID
 * @returns {object}
 */
const WeatherApp = ({ gameID }) => {
  const [celsius, setCelsius] = useToggleTemp()
  const cityInput = useRef(null)
  const weather = {}


  const getWeather = async (city) => {
    try {
      const res = await fetch(`${baseUrl}/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
      const object = await res.json()
      console.log('object???', object)
      // const parameters = object.timeSeries[0].parameters
      // weather.city = city
      // weather.temperature = parameters[11].values[0]
      // weather.unit = celsius ? '℃' : '℉'
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
      <div className="weatherInfo">

      </div>
    </div>
  )
}

const useToggleTemp = (initialValue = false) => {
  const [temp, setTemp] = useState(initialValue)
  const toggle = useCallback(() => {
    setTemp(x => !x)
  }, [])

  return [temp, toggle]
}

export default WeatherApp
