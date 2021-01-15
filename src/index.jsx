/**
 * The main script file of the application.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

/* eslint-disable no-unused-vars */

// Imports
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'

// Renders the App component in the div with id 'root'.
ReactDOM.render(
  <div>
    <App />
  </div>
  , document.getElementById('root')
)
