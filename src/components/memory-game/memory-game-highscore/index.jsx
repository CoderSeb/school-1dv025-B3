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
  const highscoreButton = useRef()
  const highscoreLabel = useRef()
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
    highscoreLabel.current.style.display = 'none'
    highscoreName.current.style.display = 'none'
    highscoreButton.current.style.display = 'none'
  }

  // Called when highscoreList changes.
  useEffect(() => {
    highscoreList.sort((a, b) => a.score - b.score)
    localStorage.setItem('memorygame-user53421', JSON.stringify(highscoreList))
  }, [highscoreList])

  /**
   * Function to clear the highscore list.
   */
  const clearHighscore = () => {
    setHighscoreList([])
  }

  return (
    <div className="MemoryGameHighscore">
    <hr/>
    <h2>Highscore</h2>
    <p className="clearScore" onClick={e => clearHighscore()}>Clear scoreboard?</p>
        <ol className="MemoryGameHighscoreList">
        <h3>2x2</h3>
        {highscoreList.length > 0
          ? highscoreList.map((scoreObj, index) => {
              if (scoreObj !== null && scoreObj.gametype === '2x2') {
                return (
                  <li key={index}><strong>{scoreObj.username}</strong>: {scoreObj.score} tries!</li>
                )
              } else {
                return null
              }
            })
          : null}
        </ol>
        <ol className="MemoryGameHighscoreList">
        <h3>4x2</h3>
        {highscoreList.length > 0
          ? highscoreList.map((scoreObj, index) => {
              if (scoreObj !== null && scoreObj.gametype === '4x2') {
                return (
                  <li key={index}><strong>{scoreObj.username}</strong>: {scoreObj.score} tries!</li>
                )
              } else {
                return null
              }
            })
          : null}
        </ol>
        <ol className="MemoryGameHighscoreList">
        <h3>4x4</h3>
        {highscoreList.length > 0
          ? highscoreList.map((scoreObj, index) => {
              if (scoreObj !== null && scoreObj.gametype === '4x4') {
                return (
                  <li key={index}><strong>{scoreObj.username}</strong>: {scoreObj.score} tries!</li>
                )
              } else {
                return null
              }
            })
          : null}
        </ol>
        <hr/>
      <label ref={highscoreLabel} htmlFor=".MemoryGameHighscoreInput">Type in your name and press save to save your score!</label>
      <input ref={highscoreName} className="MemoryGameHighscoreInput" type="text"/>
      <button ref={highscoreButton} type="button" onClick={e => saveAndShowHighscoreList(highscoreName.current.value, score)} className="MemoryGameHighscoreButton">Save score</button>
    </div>
  )
}
