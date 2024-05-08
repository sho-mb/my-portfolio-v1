'use client';
import React from 'react';
import { Button, Grid, Text, TextArea, TextField } from '@radix-ui/themes';
import { useFormState } from 'react-dom';
import { Dialog } from '../contact/Dialog';
import uploadPortfolio from '@/app/lib/portfolioFormAction';
import { State } from '@/app/types/state';

const initialState: State = {
  errors: {},
  message: '',
  isSuccess: false,
};

function SubmitButton() {
  return <Button type="submit">Submit</Button>;
}

export const PortfolioForm = () => {
  const actionFunction = (state: State, formData: FormData) => {
    return uploadPortfolio(state, formData);
  };

  const [formState, formAction] = useFormState<State, FormData>(actionFunction, initialState);

  return (
    <form action={formAction}>
      <div className="w-fit">
        {formState.message && <Dialog message={formState.message} isSuccess={false} />}
      </div>
      <input type="file" className="my-4" name="file" accept="image/jpeg, image/png" />
      <Grid gap={'1'} className="mb-4">
        <Text as="div" weight="bold" size="2" mb="1">
          Title
        </Text>
        <TextField.Root type="text" size="3" placeholder="title" name="title" />
      </Grid>
      <Grid gap={'1'}>
        <Text as="div" weight="bold" size="2" mb="1">
          content
        </Text>
        <TextArea size="3" placeholder="content" name="content" />
      </Grid>

      <div className="flex h-fit">
        <div className="text-right mt-10">
          <SubmitButton />
        </div>
      </div>
    </form>
  );
};
