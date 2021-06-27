import React from 'react'
import { useState, useEffect } from 'react';
import { ChatWrapper, Messages } from './Styles/Chat/Chat';
import Message from './Utilities/Message';
import ChatForm from './ChatForm';
import { Socket } from 'socket.io-client';

type Props = {
  data: {
    username: string,
    socket: Socket | undefined
  }
}

interface Data {
  message: string,
  username: string,
}

const Chat = ({ data }: Props) => {
  const username = data.username;
  const socket = data.socket;
  const [messagesArr, setMessagesArr] = useState<Data[]>([]);


  function handleArrayState(arrayToCopy: object[], dataToInsert: Data, stateToInsert: Function) {
    const arrWithMsg: object[] = Array.from(arrayToCopy);
    arrWithMsg.push(dataToInsert);
    stateToInsert(arrWithMsg);
  }

  useEffect(() => {
    if (socket) {
      socket.on('connected', ({ message, username }: Data) => {
        handleArrayState(messagesArr, { message, username }, setMessagesArr);
      })

      // socket.on('disconnected', (msg: string) => {
      //   handleArrayState(messagesArr, msg, setMessagesArr);
      // })
    }
    return () => {
      socket?.off('connected');
      socket?.off('disconnect');
    }
  }, [socket, messagesArr])

  useEffect(() => {
    if (socket) {
      socket.on('receive-message', ({ message, username }) => {
        handleArrayState(messagesArr, { message, username }, setMessagesArr);
      })
    }
    return () => {
      socket?.off('receive-message');
    }
  }, [socket, messagesArr])


  const handleMessage = (message: string) => {
    if (message) {
      socket?.emit('send-message', {
        message,
        username
      });
    }
  }

  return (
    <ChatWrapper>
      <Messages>
        {messagesArr.map((message, index) => {
          return (
            message.username === username ?
              <Message right key={index} message={message.message} username={"You"} /> :
              <Message key={index} message={message.message} username={message.username} />
          )
        })
        }
      </Messages>
      <ChatForm handleMessage={handleMessage} />
    </ChatWrapper>
  )
}

export default Chat
