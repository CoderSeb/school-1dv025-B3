/**
 * Script file for the PwdClock component.
 *
 * @version 1.0.0
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 */

/* eslint-disable no-unused-vars */

// Imports
import React, { useState, useEffect } from 'react'
import './styles.css'

/**
 * PwdClock function that shows the local time.
 *
 * @returns {*} as the PwdClock component.
 */
const PwdClock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  // Gets called when time is updated. Also clears the interval when component is removed.
  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(intervalID)
  }, [time, setTime])

  return (
    <div className="pwd-clock">
      <p>{time}</p>
    </div>
  )
}

export default PwdClock
