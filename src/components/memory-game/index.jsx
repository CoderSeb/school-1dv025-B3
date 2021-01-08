/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react'
import MemoryGameBoard from './memory-game-board'
import './styles.css'

/**
 * MemoryGame main function.
 *
 * @param {string} gameID
 * @returns {*} - JSX object
 */
function MemoryGame ({ gameID }) {
  const [cards, setCards] = useState([])
  const [turned, setTurned] = useState([])
  const [matched, setMatched] = useState([])
  const [stopGame, setStopGame] = useState(false)
  const [clickCount, setClickCount] = useState(0)

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

  useEffect(() => {
    setClickCount(0)
  }, [setCards, cards])

  const resetBoard = () => {
    setTurned([])
    setStopGame(false)
  }

  const cardMatched = (id) => {
    const clickedOne = cards.find((card) => card.id === id)
    const clickedTwo = cards.find((card) => turned[0] === card.id)

    return clickedOne.description === clickedTwo.description
  }

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
          <button className="restartButton" onClick={() => restartGame()}>Try again?</button>
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
        <button onClick={() => setCards(createDeck(8))}>4x4</button>
        <button onClick={() => setCards(createDeck(4))}>4x2</button>
        <button onClick={() => setCards(createDeck(2))}>2x2</button>
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
