import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import {
  usePopupState,
  bindToggle,
  bindPopper
} from 'material-ui-popup-state/hooks';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import Checkbox from '@material-ui/core/Checkbox';
import Fade from '@material-ui/core/Fade';
import InputGroup from '~components/InputGroup';
import { SearchParams, Transaction } from '~api';

export interface SearchFormProps extends SearchParams<Transaction> {
  onFormSubmit: (data: SearchParams<Transaction>) => void;
}

export default ({ onFormSubmit, ...defaultValues }: SearchFormProps) => {
  const filterOptions = [
    { label: 'Tx Hash', value: 'hash' },
    { label: 'Block Hash', value: 'block' }
    // { label: 'From', value: 'sender' },
    // { label: 'To', value: 'receiver' }
  ] as {
    label: string;
    value: keyof Transaction;
  }[];

  const { register, handleSubmit, watch } = useForm<SearchParams<Transaction>>({
    defaultValues
  });

  const keys = watch('keys');

  const popupState = usePopupState({
    variant: 'popper',
    popupId: 'demoPopper'
  });

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Box width="100%" display="flex">
        <Box flexGrow={1} display="flex" mr={2}>
          <InputGroup
            prepend={
              <ClickAwayListener onClickAway={() => popupState.setOpen(false)}>
                <div>
                  <Button
                    color="secondary"
                    size="small"
                    variant="contained"
                    {...bindToggle(popupState)}
                  >
                    <ArrowDropDownIcon />
                    Filters
                  </Button>
                  <Popper
                    placement="bottom-start"
                    {...bindPopper(popupState)}
                    transition
                    keepMounted
                  >
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={250}>
                        <Paper>
                          <Box p={1}>
                            <FormGroup>
                              {filterOptions.map(({ label, value }) => (
                                <FormControl key={value}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        inputRef={register}
                                        name="keys"
                                        value={value}
                                        defaultChecked={
                                          keys && keys.includes(value)
                                        }
                                      />
                                    }
                                    label={label}
                                  />
                                </FormControl>
                              ))}
                            </FormGroup>
                          </Box>
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                </div>
              </ClickAwayListener>
            }
          >
            <TextField
              inputRef={register}
              id="search"
              name="term"
              variant="outlined"
              placeholder={`Search by ${filterOptions
                .filter(
                  ({ value }) => !keys || !keys.length || keys.includes(value)
                )
                .map(({ label }) => label)
                .join(', ')}`}
              fullWidth
            />
          </InputGroup>
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </Box>
    </form>
  );
};
