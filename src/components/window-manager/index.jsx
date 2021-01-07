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
  const [windowArray, setWindowArray] = useState([])
  let i = 0

  /**
   * @param event
   */
  const removeWindow = useCallback((event) => {
    setWindowArray(windowArray.map((window, index) => {
      if (index === Number(event.substring(10))) {
        return window.closed = true
      } else {
        return window
      }
    }))
  }, [windowArray, setWindowArray])

  /**
   * @param id
   */
  const openWindow = useCallback((id) => {
    setWindowArray(windowArray.filter(x => x !== ''))
    if (id === 'memBtn') {
      const newMemory = {
        appObj: <MemoryGame gameID={'n-m' + i++} />,
        closed: false,
        isActive: false
      }
      setWindowArray([...windowArray, newMemory])
    }

    if (id === 'chatBtn') {
      const newChat = {
        appObj: <ChatApp gameID={'n-c' + i++} />,
        closed: false,
        isActive: false
      }
      setWindowArray([...windowArray, newChat])
    }

    if (id === 'wthBtn') {
      const newWeather = {
        appObj: <WeatherApp gameID={'n-w' + i++} />,
        closed: false,
        isActive: false
      }
      setWindowArray([...windowArray, newWeather])
    }
  }, [windowArray, setWindowArray])

  let x = 60
  let y = 100

  return (
    <div className="PwdWindowManager">
      <div className="window-manager-container">
      {windowArray.map((appWindow, index) => {
        if (appWindow.closed === false) {
          return (
            <Draggable
            key={Math.random()}
            handle=".handle"
            defaultPosition={{ x: x+=30, y: y+=30 }}
            >
              <div
              className="new-window"
              id={'new-window' + index}
              ><button type="button" className="closeBtn" onClick={e => removeWindow(e.target.parentNode.id)}>X</button>
                <div className="handle">Drag me...</div>
                {appWindow.appObj}
              </div>
            </Draggable>
          )
        }
        return (null)
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
