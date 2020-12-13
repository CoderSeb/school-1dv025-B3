import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import MemoryGame from '../memory-game'

export default function PwdWindowManager () {

  const newMemory = (appName) => {
    return <div className="new-window">{appName}</div>
  }

 const openWindow = (btnId) => {
   console.log(btnId)
    if (btnId === 'memBtn') {
      ReactDOM.render(
        newMemory(<MemoryGame />),
        document.querySelector('.window-manager-container')
      )
    }
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
