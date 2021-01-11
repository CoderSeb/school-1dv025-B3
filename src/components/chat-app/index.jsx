/**
 * Script file for the ChatApp component.
 *
 * @version 1.0.0
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 */

/* eslint-disable no-unused-vars */

// Imports
import React, { useState, useEffect, useRef } from 'react'
import './styles.css'

// API key stored.
import apiText from './apikey.json'

// Declaring the API key to a variable.
const api = apiText.apikey

/**
 * Main ChatApp function.
 *
 * @param {string} gameID as the unique game id.
 * @returns {*} as the ChatApp component.
 */
export default function ChatApp ({ gameID }) {
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState(localStorage.getItem('chat_user_name53421'))
  const [charLeft, setCharLeft] = useState(120)
  const [changeUser, setChangeUser] = useState(false)
  const messageRef = useRef()
  const usernameRef = useRef()
  const websocket = useRef(null)

  useEffect(() => {
    // Creates a new websocket.
    websocket.current = new WebSocket('wss://cscloud6-127.lnu.se/socket/')

    /**
     * Called when websocket is opened.
     *
     * @returns {*} as a console log.
     */
    websocket.current.onopen = () => console.log('Websocket opened')

    /**
     * Called when websocket is closed.
     *
     * @returns {*} as a console log.
     */
    websocket.current.onclose = () => console.log('Websocket closed')

    return () => {
      // Called when chat application is closed to also close the current websocket.
      websocket.current.close()
    }
  }, [])

  // Called when messages array changes.
  useEffect(() => {
    if (!websocket.current) return

    /**
     * Called when a message is received or sent.
     *
     * @param {object} e as the event.
     */
    websocket.current.onmessage = e => {
      const message = JSON.parse(e.data)
      setMessages([...messages, message])
    }
  }, [messages, setMessages])

  /**
   * Saves the message and sends it through the websocket.
   */
  const saveMessage = () => {
    const fullMessage = {
      type: 'message',
      data: messageRef.current.value,
      username: username,
      channel: 'my, not so secret, channel',
      key: api
    }
    websocket.current.send(JSON.stringify(fullMessage))
    messageRef.current.value = ''
  }

  /**
   * Saves the username in a local storage.
   */
  const saveUsername = () => {
    localStorage.setItem('chat_user_name53421', usernameRef.current.value)
    setUsername(localStorage.getItem('chat_user_name53421'))
  }

  /**
   * Checks if an enter button was pressed and then calls the saveMessage function.
   *
   * @param {object} e as the event.
   */
  const sendMessageIfEnter = (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      saveMessage()
    }
  }

  if (localStorage.getItem('chat_user_name53421') === null || localStorage.getItem('chat_user_name53421') === '' || changeUser) {
    return (
      <div id={gameID} className="ChatApp">
        <h1>ChatApp</h1>
        <h3>Enter username:</h3>
        <input maxLength="15" className="usernameInput" ref={usernameRef} type="text"/>
        <button onClick={() => {
          saveUsername()
          setChangeUser(false)
        }} className="chatBtnUsername">Save username</button>
      </div>
    )
  } else {
    return (
      <div id={gameID} className='ChatApp'>
          <h1>ChatApp</h1>
          <div className="chatWindow">
          <div className="chatMessages">
          {messages.map(message => {
            return (
                <p
                className={localStorage.getItem('chat_user_name53421') === message.username ? 'messageTo' : 'messageFrom'}
                key={message.data + Math.random().toString(36).substring(2)}><strong>
                {localStorage.getItem('chat_user_name53421') === message.username ? localStorage.getItem('chat_user_name53421') : message.username}:</strong> {message.data}</p>
            )
          })}
          </div>
          <div className="chatAppInputDiv">
            <h3 className="conAsUser">Connected as {username}</h3>
            <h3 className="charLeftHead">Characters left: {charLeft}</h3>
            <textarea className="chatInput" onKeyDown={sendMessageIfEnter} onChange={() => setCharLeft(messageRef.current.maxLength - messageRef.current.value.length)} maxLength="120" ref={messageRef}></textarea>
            <button onClick={saveMessage} className="chatSendBtn">Send!</button>
            <button onClick={() => setChangeUser(true)} className="chatSendBtn">Change username</button>
          </div>
          </div>
      </div>
    )
  }
}
