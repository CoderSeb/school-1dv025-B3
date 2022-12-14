/**
 * Script file for the WeatherApp component.
 *
 * @version 1.0.0
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 */

/* eslint-disable no-unused-vars */

// Imports
import React, { useState, useRef, useCallback } from 'react'
import './styles.css'
import API_KEY from './apikey.json'

const apiKey = API_KEY.weatherkey
const baseUrl = API_KEY.weatherURL

/**
 * Weather App main function.
 *
 * @param {string} gameID as the unique id for the instance of the application.
 * @returns {*} as the weather app component.
 */
const WeatherApp = ({ gameID }) => {
  const [celsius, setCelsius] = useToggleTemp(true)
  const [forecasts, setForecasts] = useState([])
  const cityInput = useRef(null)
  const tempheader = useRef(null)
  const forecastRef = useRef(null)

  /**
   * Asynchronous function to get the weather forecast from the api.
   *
   * @param {string} city as the city name.
   */
  const getWeather = async (city) => {
    if (city.length > 0) {
      try {
        const res = await fetch(`${baseUrl}/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
        const object = await res.json()
        if (object.cod === '404') {
          cityInput.current.value = object.message.toUpperCase()
        }
        const parameters = object.list
        const index = 3000
        const cityWeather = {
          id: 'new-city' + index + Math.floor(Math.random() * 500),
          city: city,
          time: parameters[0].dt_txt,
          sky: parameters[0].weather[0].description,
          temp: parameters[0].main.temp
        }
        setForecasts([...forecasts, cityWeather])
      } catch (err) {
        console.error(err.message)
      }
    }
  }

  /**
   * Takes in the clicked event and removes that forecast from the forecast array.
   *
   * @param {object} e as the event.
   */
  const closeForecast = e => {
    const id = e.target.parentNode.id
    setForecasts(forecasts.filter(x => x.id !== id))
  }

  return (
      <div id={gameID} className="WeatherApp">
      <h1>Weather App</h1>
      <label htmlFor="cities">Write a city name to get the weather!</label>
      <input id="cities" ref={cityInput}></input>
      <p className="weatherInfoTxt"><i>The app shows the weather forecast that is closest in time, usually the next whole hour.
      You can click the temperature to toggle temperature units.</i></p>
      <br />
      <button className="cityBtn" onClick={() => {
        getWeather(cityInput.current.value)
        cityInput.current.value = ''
      }}>Go!</button>
      <div className="weatherInfo">
      {forecasts.map(forecast => {
        if (forecast !== '') {
          return (
          <div key={forecast.id.toString()} id={forecast.id.toString()} ref={forecastRef} className="cityForecast">
            <button type="button" className="closeBtn weatherClose" onClick={(e) => closeForecast(e)}>X</button>
            <h2 className="cityHead">{forecast.city}</h2>
            <h3 className="timeHead">{forecast.time}</h3>
            <h3 className="skyHead">Description: {forecast.sky}</h3>
            <h3
            onClick={setCelsius}
            ref={tempheader}
            className="tempHead">
            {celsius ? forecast.temp.toFixed(1) : (forecast.temp * 1.8 + 32).toFixed(1)} {celsius ? '°C' : '℉'}</h3>
          </div>
          )
        }
        return (null)
      }
      )}
      </div>
    </div>
  )
}

/**
 * Toggle function that returns the opposite boolean value each time its called.
 *
 * @param {boolean} initialValue as the initial value.
 * @returns {*[]} as the new boolean value aswell as the toggle callback function.
 */
const useToggleTemp = (initialValue = false) => {
  const [temp, setTemp] = useState(initialValue)
  const toggle = useCallback(() => {
    setTemp(x => !x)
  }, [])
  return [temp, toggle]
}

export default WeatherApp
