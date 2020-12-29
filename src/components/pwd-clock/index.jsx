import React, { useState, useEffect } from 'react'
import './styles.css'

const PwdClock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString())

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
