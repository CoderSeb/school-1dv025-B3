import React from 'react'
import PwdWindowManager from './window-manager'
import './App.css'
import PwdClock from './pwd-clock'

export default function App () {
  return (
  <div className="App">
  <PwdClock />
  <PwdWindowManager />
  </div>
  )
}
