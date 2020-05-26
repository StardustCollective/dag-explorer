import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { SearchParams } from '~api';
import { TransactionInfo } from '~api/types';

export interface SearchFormProps extends SearchParams<TransactionInfo> {
  onFormSubmit: (data: SearchParams<TransactionInfo>) => void;
}

export default ({ onFormSubmit, ...defaultValues }: SearchFormProps) => {
  const { register, handleSubmit, reset } = useForm<
    SearchParams<TransactionInfo>
  >({
    defaultValues
  });

  useEffect(() => {
    reset(defaultValues);
  }, [JSON.stringify(defaultValues)]);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate autoComplete="off">
      <Box width="100%" display="flex">
        <TextField
          inputRef={register}
          id="search"
          name="term"
          label="Search by address, block, or tx hash"
          variant="outlined"
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </Box>
    </form>
  );
};
