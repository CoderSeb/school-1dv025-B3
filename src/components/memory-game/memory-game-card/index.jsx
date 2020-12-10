import React from 'react'

import './styles.css'

export default function MemoryGameCard ({ 
  handleClick, id, type, turned, height, width, gamestop, matched
}) {
  return (
    <div
      className={`turn-container ${turned ? 'turned' : ''}`}
      style={{width, height}}
      onClick={() => matched || gamestop ? null : handleClick(id)}
      >
      <div className="turner">
        <img
          style={{height, width}}
          className={turned ? 'front' : 'back'}
          src={turned || matched ? `./img/memory-game/${type}.png` : './img/memory-game/0.png'}
          alt={type}
        />
      </div>
    </div>
  )
}
