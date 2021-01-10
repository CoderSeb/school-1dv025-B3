/* eslint-disable no-return-assign */
/* eslint-disable space-infix-ops */
import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import './styles.css'
import MemoryGame from '../memory-game'
import ChatApp from '../chat-app'
import WeatherApp from '../weather-app'
import Draggable from 'react-draggable'

/**
 * Window manager to handle apps.
 *
 * @returns {object} - JSX object as the window manager.
 */
function PwdWindowManager () {
  const [applicationsArray, setApplicationsArray] = useState([])
  const windowRef = useRef({})
  let i = 0

  /**
   * @param event
   */
  const removeWindow = useCallback((event) => {
    setApplicationsArray(applicationsArray.map((application, index) => {
      if (event === application.id) {
        return ''
      } else {
        return application
      }
    }))
  }, [applicationsArray, setApplicationsArray])

  /**
   * @param id
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
        <button className="appSlots" id="memBtn" onClick={e => openWindow(e.target.id)}>Memory Game</button>
        <button className="appSlots" id="chatBtn" onClick={e => openWindow(e.target.id)}>Chat App</button>
        <button className="appSlots" id="wthBtn" onClick={e => openWindow(e.target.id)}>Weather App</button>
      </div>
    </div>
  )
}

export default PwdWindowManager
