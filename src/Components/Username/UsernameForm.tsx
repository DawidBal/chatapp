import React, { ChangeEvent, FormEvent } from 'react';
import { Form, FormWrapper } from '../Styles/Form/Form';
import { Button } from '../Styles/Utilities/Button';

type Props = {
  options: {
    userName: string,
    setisUsernameSet(arg: boolean): void,
    setUsername(arg: string): void
  }
}

const UsernameForm = ({ options }: Props) => {

  const usernameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    options.setUsername(e.currentTarget.value);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    options.setisUsernameSet(true);
  }

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nickname">Insert your nickname:</label>
        <input type="text" id="nickname" value={options.userName} onChange={usernameHandler} required />
        <Button rounded>Accept</Button>
      </Form>
    </FormWrapper>
  )
}

export default UsernameForm
