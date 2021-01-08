/**
 * Script file for the MemoryGame component.
 *
 * @version 1.0.0
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 */

/* eslint-disable no-unused-vars */

// Imports
import React, { useState, useEffect, useCallback } from 'react'
import MemoryGameBoard from './memory-game-board'
import './styles.css'

/**
 * MemoryGame main function.
 *
 * @param {string} gameID as the unique game id.
 * @returns {*} as the MemoryGame component.
 */
function MemoryGame ({ gameID }) {
  const [cards, setCards] = useState([])
  const [turned, setTurned] = useState([])
  const [matched, setMatched] = useState([])
  const [stopGame, setStopGame] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  /**
   * Fires when a card has been clicked to check (if) other turned card is a match.
   * Flips the tiles back if no match.
   *
   * @param {number} id as the card id.
   */
  const handleClick = (id) => {
    setClickCount(clickCount + 1)
    setStopGame(true)
    if (turned.length === 0) {
      setTurned([id])
      setStopGame(false)
    } else {
      if (clickedTwice(id)) return
      setTurned([turned[0], id])
      if (cardMatched(id)) {
        setMatched([...matched, turned[0], id])
        resetBoard()
      } else {
        setTimeout(resetBoard, 1000)
      }
    }
  }

  // Resets click count when cards array changes.
  useEffect(() => {
    setClickCount(0)
  }, [setCards, cards])

  /**
   * Function that resets the turned cards array and changes gamestop to default
   * so the user can continue the game.
   */
  const resetBoard = () => {
    setTurned([])
    setStopGame(false)
  }

  /**
   * Function that checks if the id of the card exists in the turned card array and
   * then checks if their image description matches.
   *
   * @param {number} id as the id of the card that's been clicked.
   * @returns {boolean} true if the id of the two turned cards match.
   */
  const cardMatched = (id) => {
    const clickedOne = cards.find((card) => card.id === id)
    const clickedTwo = cards.find((card) => turned[0] === card.id)

    return clickedOne.description === clickedTwo.description
  }

  // Callback function to restart the game when the function is called.
  const restartGame = useCallback(() => {
    setTurned([])
    setCards([])
    setMatched([])
    setStopGame(false)
    setClickCount(0)
    setCards(createDeck(8))
  }, [cards, turned, matched])

  /**
   * Takes an id and checks if that id exists in the "turned"
   * array which then means that card have been clicked already.
   *
   * @param {number} id as the id to look for.
   * @returns {boolean} returns true if the id exists.
   */
  const clickedTwice = id => turned.includes(id)
  if (cards.length < 1) {
    setCards(createDeck(8))
  }

  if (cards.length > 2 && cards.length === matched.length) {
    return (
        <div className="MemoryContainer" id={gameID}>
          <h1 className="winTitle">Memory Game</h1>
          <h2>Well done!</h2>
          <h3>You finished the game with {clickCount} clicks!</h3>
          <button className="memoryGameRestart" onClick={() => restartGame()}>Try again?</button>
        </div>
    )
  } else {
    return (
      <div className="MemoryContainer" id={gameID}>
        <h2>Memory Game</h2>
        <MemoryGameBoard
          cards={cards}
          turned={turned}
          handleClick={handleClick}
          gamestop={stopGame}
          matched={matched}
        />
        <button className="memoryGameOptions" onClick={() => setCards(createDeck(8))}>4x4</button>
        <button className="memoryGameOptions" onClick={() => setCards(createDeck(4))}>4x2</button>
        <button className="memoryGameOptions" onClick={() => setCards(createDeck(2))}>2x2</button>
        <span>You have clicked: {clickCount} times...</span>
      </div>
    )
  }
}

/**
 * Durstenfeld shuffle algorithm.
 * Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array.
 *
 * @param {Array} deck as the array of cards.
 * @returns {Array} array as the deck of cards after shuffle.
 */
function durstenfeldShuffle (deck) {
  const array = deck.slice(0)
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[randomIndex]
    array[randomIndex] = temp
  }
  return array
}

/**
 * Function that returns an array of objects with the keys id and description.
 *
 * @param {number} numberOfCards as the number of cards to be created.
 * @returns {Array} as the new deck of cards shuffled with the durstenfeldShuffle function.
 */
function createDeck (numberOfCards) {
  let id = 0
  const allCards = ['octopus', 'gramophone', 'clock', 'teacup', 'rose', 'scissors', 'tophat', 'skull']
  const newCards = allCards.splice(0, numberOfCards)
  const cards = newCards.reduce((x, description) => {
    x.push({
      id: id++,
      description
    })
    x.push({
      id: id++,
      description
    })
    return x
  }, [])

  return durstenfeldShuffle(cards)
}

export default MemoryGame
