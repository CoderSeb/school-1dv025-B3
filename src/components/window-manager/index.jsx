import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './styles.css'
import MemoryGame from '../memory-game'
import ChatApp from '../chat-app'
import Draggable from 'react-draggable'


export default function PwdWindowManager () {
  const windowArray = []
  let i = 0

  const removeWindow = (event) => {
    const elem = document.querySelector('#' + event.toString())
    for (let i = 0; i < windowArray.length; i++) {
      if (windowArray[i].props.gameID === elem.children[1].id) {
        windowArray.splice(i, 1)
      }
    }
    openWindow()
  }

  const openWindow = (id) => {
    if (id === 'memBtn') {
      const newMemory = <MemoryGame gameID={'n-m' + i++} />
      windowArray.push(newMemory)
    }

    if (id === 'chatBtn') {
      const newChat = <ChatApp gameID={'n-c' + i++} />
      windowArray.push(newChat)
    }

    ReactDOM.render(
      windowArray.map(appWindow => {
        return (
        <Draggable>
          <div
          className="new-window"
          id={'new-window' + i++}
          >
            <button type="button" className="closeBtn" onClick={e => removeWindow(e.target.parentNode.id)}>X</button>
            {appWindow}
          </div>
        </Draggable>
        )
      }),
      document.querySelector('.window-manager-container')
    )
  }

  return (
    <div className="PwdWindowManager">
      <div className="window-manager-container">
      </div>
      <div className="ActivityBar">
        <button className="appSlots" id="memBtn" onClick={e => openWindow(e.target.id)}>Memory Game</button>
        <button className="appSlots" id="chatBtn" onClick={e => openWindow(e.target.id)}>Chat App</button>
        <button className="appSlots" id="othBtn" onClick={e => openWindow(e.target.id)}>Other app</button>
      </div>
    </div>
  )
}

ReactDOM.render(
  <PwdWindowManager />,
  document.getElementById('root')
)