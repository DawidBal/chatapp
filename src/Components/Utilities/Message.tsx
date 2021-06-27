import React from 'react'
import styled from 'styled-components';
import { Message as Msg } from '../Styles/Chat/Chat';

const MessageContent = styled.div`

`

const MessageText = styled.p`
  margin: 0;
  padding: 0.4rem 0.6rem;
  background-color: #000000;;
  color: #fff;
  border-radius: 25px;
  font-size: 1rem;
  display: inline;
`

const MessagePerson = styled.span<StyledProps>`
  ${({ right }) => right ? 'padding-right: 0.6rem' : 'padding-left: 0.6rem;'};
  font-size: 0.8rem;
  color: #0000008f;
  display: block;
  margin: 0.5rem 0;
`

type StyledProps = {
  right?: boolean
}

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
