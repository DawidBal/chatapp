import React from 'react'
import { UserCounter, UserContainer, UserList, User } from './Styles/Chat/Users'

interface User {
  id: string,
  user: string
}

type Props = {
  userNumber: Number,
  userList: User[],
  username: String
}

const Users = ({ userNumber, userList, username }: Props) => {
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
