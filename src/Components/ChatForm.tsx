import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Form } from './Styles/Form/ChatForm'
import { Button } from './Styles/Utilities/Button'

type Props = {
  handleMessage(arg1: string): void
}

const ChatForm = ({ handleMessage }: Props) => {
  const [message, setMessage] = useState("")

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (message) {
      handleMessage(message);
      setMessage('');
    }
  }

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => setMessage(e.currentTarget.value);

  return (
    <Form onSubmit={sendMessage}>
      <input type="text" value={message} onChange={handleMessageChange} />
      <Button type={'submit'}>Send</Button>
    </Form>
  )
}

export default ChatForm
