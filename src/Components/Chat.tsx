import React from 'react'
import { useState, useEffect } from 'react';
import { ChatWrapper, Messages, Message } from './Styles/Chat/Chat';
import ChatForm from './ChatForm';
import client, { Socket } from 'socket.io-client';

const Chat = () => {

  const [messagesArr, setMessagesArr] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket>();

  function handleArrayState<T>(arrayToCopy: T[], dataToInsert: T, stateToInsert: Function) {
    const arrWithMsg: T[] = Array.from(arrayToCopy);
    arrWithMsg.push(dataToInsert);
    stateToInsert(arrWithMsg);
  }

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
        console.log(msg);
        handleArrayState(messagesArr, msg, setMessagesArr);
      })

      socket.on('disconnected', (msg: string) => {
        handleArrayState(messagesArr, msg, setMessagesArr);
      })
    }
    return () => {
      socket?.off('connected');
      socket?.off('disconnect');
    }
  }, [socket, messagesArr])

  useEffect(() => {
    if (socket) {
      socket.on('receive-message', (msg: string) => {
        handleArrayState(messagesArr, msg, setMessagesArr);
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
          return <Message key={index}>{message}</Message>
        })}
      </Messages>
      <ChatForm handleMessage={handleMessage} />
    </ChatWrapper>
  )
}

export default Chat
