import React, { useEffect, useState } from 'react'
import { UserCounter, UserContainer, UserList, User } from './Styles/Chat/Users'
import { Socket } from 'socket.io-client';

interface User {
  id: string,
  user: string
}

type Props = {
  username: String,
  socket: Socket | undefined
}

const Users = ({ socket, username }: Props) => {

  const [userNumber, setUserNumber] = useState<Number>(0);
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {

    if (socket) {
      socket.on('user-counter', ({ userCounter, userList }) => {
        setUserNumber(userCounter);
        setUserList(userList);
      })

      socket.on('user-counter-clear', ({ userCounter, userList }) => {
        setUserNumber(userCounter);
        setUserList(userList);
      })
    }
    return () => {
      socket?.off('user-counter');
      socket?.off('user-counter-clear');
    }
  }, [socket, userNumber, userList])

  return (
    <UserContainer>
      <UserCounter>{userNumber}{userNumber === 1 ? ` user` : ` users`} online</UserCounter>
      <UserList>
        {userList.map(user => {
          return <User key={user.id}>{user.user}{username === user.user ? " (you)" : null}</User>
        })}
      </UserList>
    </UserContainer>
  )
}

export default Users
