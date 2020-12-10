import React from 'react'

import MemoryGameCard from '../memory-game-card'

import './styles.css'

export default function MemoryGameBoard ({
  cards, turned, handleClick, gamestop, matched
}) {
  return (
    <div
    className="board">
      {cards.map(card => (
        <MemoryGameCard
        key={card.id}
        type={card.description}
        id={card.id}
        width={120}
        height={120}
        turned={turned.includes(card.id)}
        handleClick={handleClick}
        gamestop={gamestop || matched.includes(card.id)}
        matched={matched.includes(card.id)}
       />
      ))}
    </div>
  )
}
