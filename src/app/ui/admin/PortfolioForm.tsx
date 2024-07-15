'use client';
import React from 'react';
import { Button, Grid, Text, TextArea, TextField } from '@radix-ui/themes';
import { useFormState, useFormStatus } from 'react-dom';
import { Dialog } from '../contact/Dialog';
import uploadPortfolio from '@/services/portfolioService';
import { State } from '@/types/state';
import { getImageSizeFromFile } from '@/lib/utils/imageConverter';

const initialState: State = {
  errors: {},
  message: '',
  isSuccess: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      Submit
    </Button>
  );
}

export const PortfolioForm = () => {
  const actionFunction = async (state: State, formData: FormData) => {
    const file = formData.get('file')! as File;
    const size = await getImageSizeFromFile(file);
    if (size) {
      formData.append('height', size.height.toString());
      formData.append('width', size.width.toString());
    }
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
      <Grid gap={'1'} className="mb-4">
        <Text as="div" weight="bold" size="2" mb="1">
          Content
        </Text>
        <TextArea resize="vertical" size="3" placeholder="content" name="content" />
      </Grid>
      <Grid gap={'1'}>
        <Text as="div" weight="bold" size="2" mb="1">
          Content Url
        </Text>
        <TextField.Root type="url" size="3" placeholder="url" name="url" />
      </Grid>

      <div className="flex h-fit">
        <div className="text-right mt-10">
          <SubmitButton />
        </div>
      </div>
    </form>
  );
};
