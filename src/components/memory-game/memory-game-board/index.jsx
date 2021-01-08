import React from 'react'

import MemoryGameCard from '../memory-game-card'

import './styles.css'

export default function MemoryGameBoard ({
  cards, turned, handleClick, gamestop, matched
}) {

  const fourByFourStyle = {
    gridTemplateColumns: 'auto auto'
  }
  return (
    <div
    className="board"
    style={ cards.length === 4 ? fourByFourStyle : null }>
      {cards.map(card => (
        <MemoryGameCard
        key={card.id}
        type={card.description}
        id={card.id}
        width={cards.length === 4 ? 170 : 110}
        height={cards.length === 4 ? 170 : 110}
        turned={turned.includes(card.id)}
        handleClick={handleClick}
        gamestop={gamestop || matched.includes(card.id)}
        matched={matched.includes(card.id)}
       />
      ))}
    </div>
  )
}
