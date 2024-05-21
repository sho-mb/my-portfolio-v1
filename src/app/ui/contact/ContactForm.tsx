'use client';
import { sendEmail } from '@/services/mailService';
import { Grid, TextField, Text, TextArea, Button } from '@radix-ui/themes';
import React, { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Dialog } from './Dialog';
import { State } from '@/types/state';

export const ContactForm = () => {
  const initialState: State = {
    errors: {},
    message: '',
    isSuccess: false,
  };

  const actionFunction = (state: State, formData: FormData) => {
    cleanForm();
    return sendEmail(state, formData);
  };

  const [formState, formAction] = useFormState<State, FormData>(actionFunction, initialState);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} type="submit" aria-disabled={pending}>
        Submit
      </Button>
    );
  }

  function cleanForm(): void {
    setName('');
    setEmail('');
    setMessage('');
  }

  return (
    <form action={formAction}>
      <div className="flex justify-between">
        <h2 className="font-bold text-3xl mb-4">Send an email</h2>
        <div className="w-fit">
          {formState.message && (
            <Dialog message={formState.message} isSuccess={formState.isSuccess} />
          )}
        </div>
      </div>
      <div className="md:flex justify-between">
        <div className="md:w-[48%]">
          <Grid gap={'1'} className="mb-4">
            <Text as="div" weight="bold" size="2" mb="1">
              Name
            </Text>
            <TextField.Root
              type="text"
              size="3"
              placeholder="Write your name..."
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-describedby="name-error"
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {formState?.errors?.name && !name && (
                <p className="text-red-600">{formState.errors.name}</p>
              )}
            </div>
          </Grid>
          <Grid gap={'1'}>
            <Text as="div" weight="bold" size="2" mb="1">
              Email
            </Text>
            <TextField.Root
              type="email"
              size="3"
              placeholder="Write your email..."
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="email-error"
            />
            <div id="email-error" aria-live="polite" aria-atomic="true">
              {formState?.errors?.email && !email && (
                <p className="text-red-600">{formState.errors.email}</p>
              )}
            </div>
          </Grid>
        </div>
        <Grid gap="1" className="md:w-[48%] mt-5 md:mt-0">
          <Text as="div" weight="bold" size="2" mb="1">
            Message
          </Text>
          <TextArea
            resize="vertical"
            size="3"
            value={message}
            placeholder="Write your message..."
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            aria-describedby="message-errror"
          />
          <div id="message-error" aria-live="polite" aria-atomic="true">
            {formState?.errors?.message && !message && (
              <p className="text-red-600">{formState.errors.message}</p>
            )}
          </div>
        </Grid>
      </div>
      <div className="text-right mt-5">
        <SubmitButton />
      </div>
    </form>
  );
};
