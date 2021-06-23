import React from 'react';
import { useState } from 'react';
import openSocket from 'socket.io-client';
import Chat from './Components/Chat';
import UsernameForm from './Components/UsernameForm';

const socket = openSocket('http://localhost:3001');

const App = () => {

  const [userName, setUsername] = useState("");
  const [isUsernameSet, setisUsernameSet] = useState(false);

  socket.on('connected', (msg: string) => {
    console.log(msg);
  })

  return (
    <>
      {isUsernameSet ? <Chat /> : <UsernameForm options={{ userName, setUsername, setisUsernameSet }} />}
    </>
  );
}

export default App;