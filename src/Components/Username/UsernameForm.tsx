import React, { ChangeEvent, FormEvent } from 'react';
import { Socket } from 'socket.io-client';
import { Form, FormWrapper } from '../Styles/Form/Form';
import { Button } from '../Styles/Utilities/Button';

type Props = {
  options: {
    username: string,
    setisUsernameSet(arg: boolean): void,
    setUsername(arg: string): void,
    socket: Socket | undefined
  }
}

const UsernameForm = ({ options }: Props) => {

  const usernameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    options.setUsername(e.currentTarget.value);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    options.setisUsernameSet(true);
    options.socket?.emit('set-username', options.username);
  }

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nickname">Insert your nickname:</label>
        <input type="text" id="nickname" value={options.username} onChange={usernameHandler} maxLength={15} required />
        <Button rounded>Accept</Button>
      </Form>
    </FormWrapper>
  )
}

export default UsernameForm
