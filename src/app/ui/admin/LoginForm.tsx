'use client';
import login from '@/services/loginService';
import { Button, Grid, Text, TextField } from '@radix-ui/themes';
import React from 'react';
import { useFormState } from 'react-dom';
import { Dialog } from '../contact/Dialog';
import { messageState } from '@/types/state';

export const LoginForm = () => {
  const initialState: messageState = {
    message: '',
  };

  const actionFunction = (state: messageState, formData: FormData) => {
    return login(state, formData);
  };

  const [loginState, loginAction] = useFormState<messageState, FormData>(
    actionFunction,
    initialState
  );

  function SubmitButton() {
    return <Button type="submit">Submit</Button>;
  }

  return (
    <form action={loginAction}>
      <div className="w-fit">
        {loginState.message && <Dialog message={loginState.message} isSuccess={false} />}
      </div>
      <div className="text-left w-80 m-auto px-10 py-16 border-2 border-indigo-300">
        <Grid gap={'1'} className="mb-4">
          <Text as="div" weight="bold" size="2" mb="1">
            Id
          </Text>
          <TextField.Root type="text" size="3" placeholder="Id" name="id" />
        </Grid>
        <Grid gap={'1'}>
          <Text as="div" weight="bold" size="2" mb="1">
            Password
          </Text>
          <TextField.Root type="password" size="3" placeholder="Password" name="password" />
        </Grid>
        <div className="flex h-fit">
          <div className="text-right mt-10">
            <SubmitButton />
          </div>
        </div>
      </div>
    </form>
  );
};
