import React from 'react'
import { Message as Msg } from '../Styles/Chat/Chat';
import { MessageContent, MessageText, MessagePerson } from '../Styles/Utilities/Message';


type Props = {
  message: string,
  username: string,
  right?: boolean,
}

const Message = ({ message, username, right }: Props) => {
  return (
    <Msg right={right}>
      <MessageContent>
        <MessagePerson right={right}>{username}</MessagePerson>
        <MessageText>{message}</MessageText>
      </MessageContent>
    </Msg>
  )
}

export default Message
