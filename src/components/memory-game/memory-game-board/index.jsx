/**
 * Script file for the MemoryGameBoard component.
 *
 * @version 1.0.0
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 */

/* eslint-disable no-unused-vars */

// Imports
import React from 'react'
import MemoryGameCard from '../memory-game-card'
import './styles.css'

/**
 * Function that returns the MemoryGameBoard component.
 *
 * @param {object} MemoryGameBoardProps - Deconstructed props as stated below.
 * @param {object[]} MemoryGameBoardProps.cards - Array of cards to be created.
 * @param {number[]} MemoryGameBoardProps.turned - Array of turned cards id.
 * @param {Function} MemoryGameBoardProps.handleClick - Function to handle the click event.
 * @param {boolean} MemoryGameBoardProps.gamestop - Array of turned cards id.
 * @param {number[]} MemoryGameBoardProps.matched - Array of matched cards id.
 * @returns {*} as the MemoryGameBoard component.
 */
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
