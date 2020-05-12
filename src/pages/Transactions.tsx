import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import 'moment/min/locales';
import qs from 'qs';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
import {
  fetchTransactions,
  Transaction,
  PagedResult,
  SearchParams
} from '~api';

export default () => {
  const location = useLocation();
  const history = useHistory();
  const params = useMemo(() => qs.parse(location.search.replace(/^\?/, '')), [
    location
  ]);
  const { register, handleSubmit, watch } = useForm<SearchParams<Transaction>>({
    defaultValues: {
      term: params.term || '',
      keys: params.keys || []
    }
  });
  const { page = 1, rowsPerPage = 10, term } = params;
  const [{ rows, count }, setTransactionResult] = useState<
    PagedResult<Transaction>
  >({
    count: -1,
    rows: []
  });
  const popupState = usePopupState({
    variant: 'popper',
    popupId: 'demoPopper'
  });
  const keys = watch('keys');

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    nextPage: number
  ) => {
    history.push({
      search: qs.stringify({
        term,
        keys,
        rowsPerPage,
        page: nextPage > 0 ? nextPage + 1 : undefined
      })
    });
  };

  const handleChangeRowsPerPage = ({
    target: { value: rowsPerPage }
  }: React.ChangeEvent<HTMLInputElement>) => {
    history.push({ search: qs.stringify({ term, keys, rowsPerPage }) });
  };

  const handleSearch = handleSubmit(
    ({ term, keys }: SearchParams<Transaction>) => {
      history.push({ search: qs.stringify({ term, keys, rowsPerPage }) });
    }
  );

  useEffect(() => {
    fetchTransactions({
      page,
      rowsPerPage,
      term,
      keys
    }).then(payload => setTransactionResult(payload));
  }, [location]);

  const filterOptions = [
    { label: 'Txn Hash', value: 'txnHash' },
    { label: 'Block No', value: 'blockNo' },
    { label: 'From', value: 'from' },
    { label: 'To', value: 'to' }
  ] as {
    label: string;
    value: keyof Transaction;
  }[];

  return (
    <>
      <Box mb={2}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h1">
              Transactions
            </Typography>
            <form onSubmit={handleSearch}>
              <Box width="100%" display="flex">
                <Box flexGrow={1} display="flex" mr={2}>
                  <InputGroup
                    prepend={
                      <ClickAwayListener
                        onClickAway={() => popupState.setOpen(false)}
                      >
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
                          ({ value }) =>
                            !keys || !keys.length || keys.includes(value)
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
          </CardContent>
        </Card>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Txn Hash</TableCell>
                <TableCell>Block No</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Txn Fee</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(
                ({ id, txnHash, blockNo, date, from, to, value, txnFee }) => (
                  <TableRow key={id}>
                    <TableCell size="small">
                      <Typography variant="body2" display="block" noWrap>
                        {txnHash}
                      </Typography>
                    </TableCell>
                    <TableCell size="small">{blockNo}</TableCell>
                    <TableCell size="small">{`${moment
                      .duration(date)
                      .humanize()} ago`}</TableCell>
                    <TableCell size="small">
                      <Typography variant="body2" display="block" noWrap>
                        {from}
                      </Typography>
                    </TableCell>
                    <TableCell size="small">
                      <Typography variant="body2" display="block" noWrap>
                        {to}
                      </Typography>
                    </TableCell>
                    <TableCell size="small">{value}</TableCell>
                    <TableCell size="small">{txnFee}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={count}
          rowsPerPage={+rowsPerPage}
          page={+page - 1}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
};
