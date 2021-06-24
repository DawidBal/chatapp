import React from 'react';
import { useState } from 'react';
import Chat from './Components/Chat';
import UsernameForm from './Components/Username/UsernameForm';

const App = () => {

  const [userName, setUsername] = useState("");
  const [isUsernameSet, setisUsernameSet] = useState(false);

  return (
    <>
      {isUsernameSet ? <Chat /> : <UsernameForm options={{ userName, setUsername, setisUsernameSet }} />}
    </>
  );
}

export default App;