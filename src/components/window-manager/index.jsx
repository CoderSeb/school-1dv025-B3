/**
 * Script file for the PwdWindowManager component.
 *
 * @version 1.0.0
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 */

/* eslint-disable no-return-assign */
/* eslint-disable space-infix-ops */

// Imports
import React, { useState, useCallback } from 'react'
import './styles.css'
import MemoryGame from '../memory-game'
import ChatApp from '../chat-app'
import WeatherApp from '../weather-app'
import Draggable from 'react-draggable'

/**
 * Window manager to handle apps.
 *
 * @returns {*} - JSX object as the window manager.
 */
function PwdWindowManager () {
  const [applicationsArray, setApplicationsArray] = useState([])
  let i = 0

  /**
   * Takes in an id and removed the app with the same id from the applications array.
   *
   * @param {string} id as the id of the app to be removed.
   */
  const removeWindow = (id) => {
    setApplicationsArray(applicationsArray.filter(app => app.id !== id))
  }

  const getFocus = useCallback((event) => {
    if (event.target.nodeName === 'DIV') {
      setApplicationsArray(applicationsArray.map((app, index) => {
        if (app.id === event.target.id) {
          return {
            ...app,
            isFocused: true
          }
        }
        return {
          ...app,
          isFocused: false
        }
      }))
    }
  }, [applicationsArray, setApplicationsArray])

  /**
   * Takes in an id and adds that corresponding app object to the applications array.
   *
   * @param {string} id as the id of the app to open.
   */
  const openWindow = (id) => {
    const originalKey = id + Date.now()

    if (id === 'memBtn') {
      i++
      const newMemory = {
        appObj: <MemoryGame gameID={ originalKey } />,
        closed: false,
        isActive: false,
        id: originalKey,
        isFocused: false
      }
      setApplicationsArray([...applicationsArray, newMemory])
    }

    if (id === 'chatBtn') {
      i++
      const newChat = {
        appObj: <ChatApp gameID={ originalKey } />,
        closed: false,
        isActive: false,
        id: originalKey,
        isFocused: false
      }
      setApplicationsArray([...applicationsArray, newChat])
    }

    if (id === 'wthBtn') {
      i++
      const newWeather = {
        // Sätt unikt id
        appObj: <WeatherApp gameID={ originalKey } />,
        closed: false,
        isActive: false,
        id: originalKey,
        isFocused: false
      }
      setApplicationsArray([...applicationsArray, newWeather])
    }
  }

  let x = 60
  let y = 100

  return (
    <div className="PwdWindowManager">
      <div className="window-manager-container">
      {applicationsArray.map((appWindow, index) => {
        if (appWindow !== '') {
          return (
          <Draggable
          key={appWindow.id}
          handle=".handle"
          defaultPosition={{ x: x+=30, y: y+=30 }}
          >
            <div
            className={'new-window'}
            id={appWindow.id}
            onClick={e => getFocus(e)}
            style={appWindow.isFocused ? { zIndex: 50 } : { zIndex: 10 }}
            tabIndex="1"
            ><button type="button" className="closeBtn" onClick={e => removeWindow(e.target.parentNode.id)}>X</button>
              <div className="handle">Drag me...</div>
              {appWindow.appObj}
            </div>
          </Draggable>
          )
        } else {
          return null
        }
      })}
      </div>
      <div className="ActivityBar">
        <button className="appSlots" tabIndex="0" id="memBtn" onClick={e => openWindow(e.target.id)}>Memory Game</button>
        <button className="appSlots" tabIndex="0" id="chatBtn" onClick={e => openWindow(e.target.id)}>Chat App</button>
        <button className="appSlots" tabIndex="0" id="wthBtn" onClick={e => openWindow(e.target.id)}>Weather App</button>
      </div>
    </div>
  )
}

export default PwdWindowManager
