import React from 'react'
import { useState, useEffect } from 'react';
import { ChatWrapper, Messages } from './Styles/Chat/Chat';
import ChatForm from './Styles/Chat/ChatForm';
import client, { Socket } from 'socket.io-client';

const Chat = () => {

  const [messagesArr, setMessagesArr] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const newSocket = client('http://localhost:8080');
    setSocket(newSocket);
    return () => {
      newSocket.close();
    }
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('connected', (msg: string) => {
        const arrWithMsg: string[] = Array.from(messagesArr);
        arrWithMsg.push(msg);
        setMessagesArr(arrWithMsg);
      })
    }
    return () => {
      socket?.off('connected');
    }
  }, [socket])

  useEffect(() => {
    if (socket) {
      socket.on('receive-message', (msg: string) => {
        const arrWithMsg: string[] = Array.from(messagesArr);
        arrWithMsg.push(msg);
        setMessagesArr(arrWithMsg);
      })
    }
    return () => {
      socket?.off('receive-message');
    }
  }, [socket, messagesArr])


  const handleMessage = (message: string) => {
    if (message) {
      socket?.emit('send-message', message);
    }
  }

  return (
    <ChatWrapper>
      <Messages>
        {messagesArr.map((message, index) => {
          return <li key={index}>{message}</li>
        })}
      </Messages>
      <ChatForm handleMessage={handleMessage} />
    </ChatWrapper>
  )
}

export default Chat
