import React from 'react';
import { useState } from 'react';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');

const App = () => {

  const [userName, setUsername] = useState("");
  const [isUsernameSet, setisUsernameSet] = useState(false);

  socket.on('connected', (msg: string) => {
    console.log(msg);
  })

  return (
    <div className="App">

    </div>
  );
}

export default App;