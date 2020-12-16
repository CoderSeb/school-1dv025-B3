import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import './styles.css'

import apiText from './apikey.json'

const api = apiText.apikey

export default function ChatApp ({ gameID }) {
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState(null)
  const messageRef = useRef()
  const usernameRef = useRef()

  const websocket = new WebSocket('wss://cscloud6-127.lnu.se/socket/') || {}

  websocket.onopen = () => {
    console.log('Opened web socket connection...')
  }

  websocket.onclose = (e) => {
    console.log('Closed web socket connection: ', e.code, e.reason)
  }

  websocket.onmessage = (e) => {
    const parsed = JSON.parse(e.data)
    if (parsed.username !== 'The Server') {
      setMessages([...messages, parsed])
    }
  }

  const saveMessage = () => {
    const fullMessage = {
      type: 'message',
      data: messageRef.current.value,
      username: username,
      channel: 'my, not so secret, channel',
      key: api
    }
    setMessages([...messages, fullMessage])
    websocket.send(JSON.stringify(fullMessage))
  }

  const saveUsername = () => {
    localStorage.setItem('chat_user_name53421', usernameRef.current.value)
    setUsername(localStorage.getItem('chat_user_name53421'))
  }

  // const sendMessageIfEnter = (e) => {
  //   if (e.keyCode === 13) {
  //     sendMessage()
  //   }
  // }

  if (localStorage.getItem('chat_user_name53421') === null || localStorage.getItem('chat_user_name53421') === '') {
    return (
      <div id={gameID} className="ChatApp">
        <h1>ChatApp</h1>
        <h3>Enter username:</h3>
        <input maxLength="15" className="usernameInput" ref={usernameRef} type="text"/>
        <button onClick={saveUsername} className="chatBtnUsername">Save username</button>
      </div>
    )
  } else {
    return (
      <div id={gameID} className='ChatApp'>
          <h1>ChatApp</h1>
          <div className="chatMessages">
          {messages.map(message => {
            return (
                <p
                className={localStorage.getItem('chat_user_name53421') === message.username ? 'messageTo' : 'messageFrom'}
                key={message.data + Math.random().toString(36).substring(2)}>
                {localStorage.getItem('chat_user_name53421') === message.username ? localStorage.getItem('chat_user_name53421') : message.username}: {message.data}</p>
            )
          })}
          </div>
          <textarea className="chatInput" ref={messageRef}></textarea>
          <button onClick={saveMessage} className="chatSendBtn">Send!</button>
      </div>
    )
  }
}
