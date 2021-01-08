/**
 * Script file for the MemoryGameCard component.
 *
 * @version 1.0.0
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 */

// Imports
import React from 'react'
import './styles.css'

/**
 * Function that returns the MemoryGameCard component.
 *
 * @param {object} MemoryGameCardProps - Deconstructed props as stated below.
 * @param {Function} MemoryGameCardProps.handleClick - Function to handle the click event.
 * @param {number} MemoryGameCardProps.id - The id to give the card.
 * @param {object[]} MemoryGameCardProps.type- Array of cards to be created.
 * @param {number[]} MemoryGameCardProps.turned - Array of turned cards id.
 * @param {object[]} MemoryGameCardProps.height - Array of cards to be created.
 * @param {object[]} MemoryGameCardProps.width - Array of cards to be created.
 * @param {boolean} MemoryGameCardProps.gamestop - Array of turned cards id.
 * @param {number[]} MemoryGameCardProps.matched - Array of matched cards id.
 * @returns {*} as the MemoryGameBoard component.
 */
export default function MemoryGameCard ({
  handleClick, id, type, turned, height, width, gamestop, matched
}) {
  return (
    <div
      className={`turn-container ${turned ? 'turned' : ''}`}
      style={{ width: width, height: height, opacity: matched ? 0.5 : 1 }}
      opacity={matched ? 0.5 : 1}
      onClick={() => matched || gamestop ? null : handleClick(id)}
      >
      <div className="turner">
        <img
          style={{ width: width, height: height }}
          className={turned ? 'front' : 'back'}
          src={turned || matched ? `./img/memory-game/${type}.png` : './img/memory-game/0.png'}
          alt={type}
        />
      </div>
    </div>
  )
}
