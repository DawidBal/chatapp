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

interface DataID {
  id: string,
  message: string,
  username: string,
}

const Chat = ({ data }: Props) => {
  const username = data.username;
  const socket = data.socket;
  const [messagesArr, setMessagesArr] = useState<DataID[]>([]);
  const [typingArr, setTypingArr] = useState<DataID[]>([]);
  const [isTyping, setIsTyping] = useState(false);


  function handleArrayState(arrayToCopy: object[], dataToInsert: DataID, stateToInsert: Function) {
    const arrWithMsg: object[] = [...arrayToCopy];
    arrWithMsg.push(dataToInsert);
    stateToInsert(arrWithMsg);
  }

  useEffect(() => {
    if (socket) {
      socket.on('connected', ({ id, message, username }) => {
        handleArrayState(messagesArr, { id, message, username }, setMessagesArr);
      })

      socket.on('disconnected', ({ id, message, username }) => {
        handleArrayState(messagesArr, { id, message, username }, setMessagesArr);
      })
    }
    return () => {
      socket?.off('connected');
      socket?.off('disconnect');
    }
  }, [socket, messagesArr])

  useEffect(() => {
    if (socket) {
      socket.on('receive-message', ({ id, message, username }) => {
        handleArrayState(messagesArr, { id, message, username }, setMessagesArr);
      })
    }
    return () => {
      socket?.off('receive-message');
    }
  }, [socket, messagesArr])

  useEffect(() => {
    socket?.on('typing-message', ({ id, message, username }) => {
      handleArrayState(typingArr, { id, message, username }, setTypingArr);
    })

    return () => {
      socket?.off('typing-message');
    }
  }, [socket, typingArr])

  useEffect(() => {
    socket?.on('clear-typing-message', (username) => {
      const arrWithMsg = [...typingArr].filter(typeMsg => typeMsg.username !== username);
      setTypingArr(arrWithMsg);
    })
    return () => {
      socket?.off('clear-typing-message');
    }
  }, [socket, typingArr])

  const handleMessage = (message: string) => {
    if (message) {
      socket?.emit('send-message', {
        message,
        username
      });
    }
  }

  useEffect(() => {
    isTyping ? socket?.emit('is-typing') : socket?.emit('stoped-typing');
  }, [isTyping])

  return (
    <ChatWrapper>
      <Messages>
        {messagesArr.map((message) => {
          return (
            message.username === username ?
              <Message right key={message.id} message={message.message} username={"You"} /> :
              <Message key={message.id} message={message.message} username={message.username} />
          )
        })
        }
        {typingArr.map((typeMessage) => {
          return <Message key={typeMessage.id} message={typeMessage.message} username={typeMessage.username} />
        })
        }
      </Messages>
      <ChatForm handleMessage={handleMessage} setIsTyping={setIsTyping} />
    </ChatWrapper>
  )
}

export default Chat
