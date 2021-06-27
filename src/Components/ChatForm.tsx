import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { StickyForm, Input } from './Styles/Form/ChatForm'
import { Button } from './Styles/Utilities/Button'

type Props = {
  handleMessage(arg1: string): void
  setIsTyping(arg1: boolean): void
}

const ChatForm = ({ handleMessage, setIsTyping }: Props) => {
  const [message, setMessage] = useState("")

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (message) {
      handleMessage(message);
      setMessage('');
      setIsTyping(false);
    }
  }

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value)
  };

  useEffect(() => {
    if (message.split('').length > 0) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, [message])

  return (
    <StickyForm onSubmit={sendMessage}>
      <Input type="text" value={message} onChange={handleMessageChange} />
      <Button type={'submit'}>Send</Button>
    </StickyForm>
  )
}

export default ChatForm
