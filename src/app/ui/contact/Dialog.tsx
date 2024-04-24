import { Callout } from '@radix-ui/themes';
import React from 'react';

interface DialogProps {
  message?: string;
  isSuccess: boolean;
}

export const Dialog = (props: DialogProps) => {
  return (
    <div>
      <Callout.Root color={props.isSuccess ? 'blue' : 'red'}>
        <Callout.Text>{props.message}</Callout.Text>
      </Callout.Root>
    </div>
  );
};
