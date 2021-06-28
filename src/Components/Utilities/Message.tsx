import React from 'react'
import { Message as Msg } from '../Styles/Chat/Chat';
import { MessageContent, MessageText, MessagePerson, MessageTime } from '../Styles/Utilities/Message';


type Props = {
  message: string,
  username: string,
  right?: boolean,
  timestamp?: string
}

const Message = ({ message, username, timestamp, right }: Props) => {
  return (
    <Msg right={right}>
      <MessageContent>
        <MessagePerson right={right}>{username}</MessagePerson>
        <MessageText>{message}</MessageText>
        <MessageTime>{timestamp}</MessageTime>
      </MessageContent>
    </Msg>
  )
}

export default Message
