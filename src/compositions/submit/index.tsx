import * as React from 'react';
import Button from '../../components/button';

export interface Props extends React.HTMLAttributes<{}> {
  label: string;
  pending?: boolean;
  pendingLabel: string;
}

function Submit({ className, id, label, pending, pendingLabel }: Props) {
  return (
    <>
      {pending ? (
        <Button.Spinner className={className}>{pendingLabel}</Button.Spinner>
      ) : (
        <Button className={className} id={id} type="submit" variant="primary">
          {label}
        </Button>
      )}
    </>
  );
}

export default Submit;
