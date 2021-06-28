import React from 'react'
import { UserCounter, UserContainer, UserList, User } from './Styles/Chat/Users'

interface User {
  id: string,
  user: string
}

type Props = {
  userNumber: Number,
  userList: User[]
}

const Users = ({ userNumber, userList }: Props) => {
  return (
    <UserContainer>
      <UserCounter>{userNumber}{userNumber === 1 ? ` user` : ` users`} online</UserCounter>
      <UserList>
        {userList.map(user => {
          return <User key={user.id}>{user.user}</User>
        })}
      </UserList>
    </UserContainer>
  )
}

export default Users
