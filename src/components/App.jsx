/**
 * Main script file for the application.
 *
 * @version 1.0.0
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 */

/* eslint-disable no-unused-vars */

// Imports
import React from 'react'
import PwdWindowManager from './window-manager'
import './App.css'
import PwdClock from './pwd-clock'

/**
 * Main function of the application.
 *
 * @returns {*} as the App component.
 */
export default function App () {
  return (
  <div className="App">
  <PwdClock />
  <PwdWindowManager />
  </div>
  )
}
