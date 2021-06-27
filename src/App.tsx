import React from 'react';
import { useState, useEffect } from 'react';
import Chat from './Components/Chat';
import UsernameForm from './Components/Username/UsernameForm';
import client, { Socket } from 'socket.io-client';

const App = () => {

  const [username, setUsername] = useState("");
  const [isUsernameSet, setisUsernameSet] = useState(false);

  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const newSocket = client('http://localhost:8080');
    setSocket(newSocket);
    return () => {
      newSocket.close();
    }
  }, [])

  return (
    <>
      {isUsernameSet ? <Chat data={{ username, socket }} /> : <UsernameForm options={{ username, setUsername, setisUsernameSet, socket }} />}
    </>
  );
}

export default App;