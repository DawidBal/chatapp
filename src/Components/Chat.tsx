import React, { useRef } from 'react'
import { useState, useEffect } from 'react';
import { ChatWrapper, Messages, TwoCols } from './Styles/Chat/Chat';
import Message from './Utilities/Message';
import ChatForm from './ChatForm';
import { Socket } from 'socket.io-client';
import Users from './Users';

type Props = {
  data: {
    username: string,
    socket: Socket | undefined
  }
}

interface DataID {
  id: string,
  username: string
  message: string,
  timestamp: string
}

const Chat = ({ data }: Props) => {
  const username = data.username;
  const socket = data.socket;
  const [messagesArr, setMessagesArr] = useState<DataID[]>([]);
  const [typingArr, setTypingArr] = useState<DataID[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const msgListRef = useRef<HTMLUListElement>(null);

  const handleArrayState = (arrayToCopy: DataID[], dataToInsert: DataID, stateToInsert: Function) => {
    const arrWithMsg: DataID[] = [...arrayToCopy];
    arrWithMsg.push(dataToInsert);
    stateToInsert(arrWithMsg);
  }

  useEffect(() => {

    if (socket) {
      socket.on('connected', ({ id, message, username, timestamp }) => {
        handleArrayState(messagesArr, { id, message, username, timestamp }, setMessagesArr);
      })
      socket.on('disconnected', ({ id, message, username, timestamp }) => {
        handleArrayState(messagesArr, { id, message, username, timestamp }, setMessagesArr);

      })
    }
    return () => {
      socket?.off('connected');
      socket?.off('disconnect');
    }
  }, [socket, messagesArr])

  useEffect(() => {

    if (socket) {
      socket.on('receive-message', ({ id, message, username, timestamp }) => {
        handleArrayState(messagesArr, { id, message, username, timestamp }, setMessagesArr);
        msgListRef.current?.children[messagesArr.length]?.scrollIntoView({ behavior: 'smooth' });
      })
    }
    return () => {
      socket?.off('receive-message');
    }
  }, [socket, messagesArr])

  useEffect(() => {
    socket?.on('typing-message', ({ id, message, username, timestamp }) => {
      handleArrayState(typingArr, { id, message, username, timestamp }, setTypingArr);
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
      <TwoCols>
        <Users socket={socket} username={username} />
        <Messages ref={msgListRef}>
          {messagesArr.map((message) => {
            return (
              message.username === username ?
                <Message right key={message.id} message={message.message} username={"You"} timestamp={message.timestamp} /> :
                <Message key={message.id} message={message.message} username={message.username} timestamp={message.timestamp} />
            )
          })
          }
          {typingArr.map((typeMessage) => {
            return <Message key={typeMessage.id} message={typeMessage.message} username={typeMessage.username} />
          })
          }
        </Messages>
      </TwoCols>
      <ChatForm handleMessage={handleMessage} setIsTyping={setIsTyping} />
    </ChatWrapper>
  )
}

export default Chat
