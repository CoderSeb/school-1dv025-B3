/**
 * Script file for the MemoryGameHighscore component.
 *
 * @version 1.0.0
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 */

/* eslint-disable no-unused-vars */

// Imports
import React, { useRef, useState, useEffect } from 'react'
import './styles.css'

/**
 * Main function for the MemoryGameHighscore component.
 *
 * @param {*} MemoryGameHighscoreProps deconstructed props as stated below.
 * @param {number} MemoryGameHighscoreProps.score as the total clicks.
 * @param {string} MemoryGameHighscoreProps.gametype as the type of game mode.
 * @returns {*} as the MemoryGameHighscore component.
 */
export default function MemoryGameHighscore ({ score, gametype }) {
  const highscoreName = useRef()
  const [highscoreList, setHighscoreList] = useState(() => {
    const highscoreData = localStorage.getItem('memorygame-user53421')
    return highscoreData ? JSON.parse(highscoreData) : []
  })

  /**
   * Adds the new user to the highscore array when called.
   *
   * @param {string} name as the users name.
   * @param {number} score as the total clicks.
   */
  const saveAndShowHighscoreList = (name, score) => {
    const newUser = {
      username: name,
      score: Math.floor(score / 2),
      gametype: gametype
    }
    setHighscoreList([...highscoreList, newUser])
  }

  useEffect(() => {
    highscoreList.sort((a, b) => a.score + b.score)
    localStorage.setItem('memorygame-user53421', JSON.stringify(highscoreList))
  }, [highscoreList])

  return (
    <div className="MemoryGameHighscore">
        <ol className="MemoryGameHighscoreList">
        {highscoreList.length > 0
          ? highscoreList.map((scoreObj, index) => {
              if (scoreObj !== null) {
                return (
                  <li key={index}><strong>Mode: {scoreObj.gametype} | {scoreObj.username}</strong>: {scoreObj.score} tries!</li>
                )
              } else {
                return null
              }
            })
          : null}
        </ol>
      <label htmlFor=".MemoryGameHighscoreInput">Type in your name and press save to save your score!</label>
      <input ref={highscoreName} className="MemoryGameHighscoreInput" type="text"/>
      <button onClick={e => saveAndShowHighscoreList(highscoreName.current.value, score)} className="MemoryGameHighscoreButton">Save score</button>
    </div>
  )
}
