import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTheme } from '@material-ui/core/styles';
import { Button, Box, TextField } from '@material-ui/core';
import * as Icon from '@material-ui/icons';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { InputGroup } from '~components';
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
  const theme = useTheme();
  const matchesSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    reset(defaultValues);
  }, [JSON.stringify(defaultValues)]);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate autoComplete="off">
      <Box width="100%" display="flex">
        <InputGroup
          append={
            <Button type="submit" variant="contained" color="primary">
              {matchesSmUp ? <>Search</> : <Icon.Search />}
            </Button>
          }
        >
          <TextField
            inputRef={register}
            id="search"
            name="term"
            label={
              matchesSmUp
                ? 'Search by address, block or tx hash'
                : 'Address, block, tx hash'
            }
            variant="outlined"
            fullWidth
          />
        </InputGroup>
      </Box>
    </form>
  );
};
