import React, { useState, useEffect } from 'react'
import MemoryGameBoard from './memory-game-board'

export default function MemoryGame () {
  const [cards, setCards] = useState([])
  const [turned, setTurned] = useState([])
  const [matched, setMatched] = useState([])
  const [stopGame, setStopGame] = useState(false)

  useEffect(() => {
    setCards(createDeck())
  }, [])

  const handleClick = (id) => {
    setStopGame(true)
    if (turned.length === 0) {
      setTurned([id])
      setStopGame(false)
    } else {
      if (clickedTwice (id)) return
      setTurned([turned[0], id])
      if (cardMatched(id)) {
        setMatched([...matched, turned[0], id])
        resetBoard()
      } else {
        setTimeout(resetBoard, 1000)
      }
    }
  }

  const resetBoard = () => {
    setTurned([])
    setStopGame(false)
  }

  const cardMatched = (id) => {
    const clickedOne = cards.find((card) => card.id === id)
    const clickedTwo = cards.find((card) => turned[0] === card.id)

    return clickedOne.description === clickedTwo.description
  }

  const clickedTwice = id => turned.includes(id)



  return (
    <div>
      <h2>Memory Game</h2>
      <MemoryGameBoard
        cards={cards}
        turned={turned}
        handleClick={handleClick}
        gamestop={stopGame}
        matched={matched}
      />
    </div>
    )
}

/**
 * Durstenfeld shuffle algorithm.
 * source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
function durstenfeldShuffle (deck) {
  const array = deck.slice(0)
  for (let i = array.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1))
      let temp = array[i]
      array[i] = array[randomIndex]
      array[randomIndex] = temp
  }
  return array
}

function createDeck () {
  let id = 0
  const cards = ['octopus', 'gramophone', 'clock', 'teacup', 'rose', 'scissors', 'tophat', 'skull'].reduce((x, description) => {
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