import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useHistory, Link as RouterLink } from 'react-router-dom';
import qs from 'qs';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Skeleton from '@material-ui/lab/Skeleton';
import { IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import ActivityIndicator from '~components/ActivityIndicator';
import SearchForm from '~features/transactions/SearchForm';
import {
  fetchTransactions,
  PagedResult,
  SearchParams,
  fetchAddress
} from '~api';
import { AddressInfo, TransactionInfo } from '~api/types';
import ResponsiveTable from '~components/ResponsiveTable';

export default () => {
  const location = useLocation();
  const history = useHistory();
  const params = useMemo(() => qs.parse(location.search.replace(/^\?/, '')), [
    location
  ]);
  const { startAt = 0, endAt = 9, term } = params;
  const rowsPerPage = +endAt - +startAt + 1;
  const [isPending, setPending] = useState<boolean>(true);
  const [transactionResult, setTransactionResult] = useState<PagedResult<
    TransactionInfo
  > | null>(null);
  const { rows = [], count = -1 } = transactionResult || {};
  const [address, setAddress] = useState<AddressInfo | null>();
  const page = count ? ~~(+startAt / rowsPerPage) : 0;

  const isAddress = useMemo(
    () =>
      term &&
      count === rows.length &&
      rows.every(row => row.sender === term || row.receiver === term),
    [term, count, rows]
  );
  const isBlock = useMemo(
    () =>
      term &&
      count === rows.length &&
      rows.length &&
      rows.every(transaction => transaction.block === term),
    [term, count, rows]
  );
  const block = isBlock ? { hash: term } : null;
  const isSingleTransaction =
    term && !isAddress && !isBlock && rows.length === 1;
  const transaction = isSingleTransaction ? rows[0] : null;

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    nextPage: number
  ) => {
    history.push({
      search: qs.stringify({
        term,
        startAt: nextPage * rowsPerPage,
        endAt: nextPage * rowsPerPage + rowsPerPage
      })
    });
  };

  const handleChangeRowsPerPage = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    history.push({
      search: qs.stringify({ term, startAt, endAt: startAt + value })
    });
  };

  const handleSearch = ({ term, keys }: SearchParams<TransactionInfo>) => {
    history.push({ search: qs.stringify({ term, keys, rowsPerPage }) });
  };

  useEffect(() => {
    if (isAddress) {
      fetchAddress(term).then(payload => {
        setAddress(payload);
      });
    } else {
      setAddress(null);
    }
  }, [location, term, isAddress]);

  useEffect(() => {
    setPending(true);
    fetchTransactions(term ? { term } : { startAt, endAt }).then(payload => {
      setPending(false);
      setTransactionResult(payload);
    });
  }, [location]);

  return (
    <>
      <Box mb={2}>
        <Card>
          <CardContent>
            <Box mb={2} display="flex" alignItems="flex-end">
              <IconButton
                color="default"
                aria-label="back"
                component={RouterLink}
                to={`/`}
              >
                <ArrowBack />
              </IconButton>
              <Typography gutterBottom variant="h5" component="h1">
                DAG Explorer
              </Typography>
            </Box>
            <SearchForm term={term} onFormSubmit={handleSearch} />
          </CardContent>
        </Card>
      </Box>
      <ResponsiveTable
        rows={rows}
        columns={[
          {
            name: 'hash',
            noWrap: true,
            primary: true,
            media: { smUp: { hidden: true } },
          },
          { name: 'block', noWrap: true },
          { name: 'sender', noWrap: true },
          { name: 'receiver', noWrap: true }
        ]}
        media={{
          smUp: {
            detail: row => (
              <div>
                Hello
              </div>
            ),
            summary: row => (
              <div>
                Summary
              </div>
            )
          }
        }}
      />
      {isAddress && (
        <Box mb={2}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
                Address
              </Typography>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell size="small">Address</TableCell>
                    <TableCell>
                      {(address && `${address.hash}`) || (
                        <Skeleton variant="text" />
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell size="small">Balance</TableCell>
                    <TableCell>
                      {(address && `${address.balance} $DAG`) || (
                        <Skeleton variant="text" />
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell size="small">$DAG Value</TableCell>
                    <TableCell>
                      {(address && `${address.balance} $DAG`) || (
                        <Skeleton variant="text" />
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Box>
      )}
      {isBlock && (
        <Box mb={2}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
                Block
              </Typography>
              <Table aria-label="Block Details">
                <TableBody>
                  <TableRow>
                    <TableCell>Hash</TableCell>
                    <TableCell>
                      <Link
                        component={RouterLink}
                        to={`/transactions?${qs.stringify({
                          term: block!.hash
                        })}`}
                      >
                        {block!.hash}
                      </Link>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Box>
      )}
      {isSingleTransaction && (
        <Box mb={2}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
                Transaction
              </Typography>
              <Table aria-label="Transaction Details">
                <TableBody>
                  <TableRow>
                    <TableCell>Hash</TableCell>
                    <TableCell>{transaction!.hash}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Block</TableCell>
                    <TableCell>
                      <Link
                        component={RouterLink}
                        to={`/transactions?${qs.stringify({
                          term: transaction!.block
                        })}`}
                      >
                        {transaction!.block}
                      </Link>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>From</TableCell>
                    <TableCell>
                      <Link
                        component={RouterLink}
                        to={`/transactions?${qs.stringify({
                          term: transaction!.sender
                        })}`}
                      >
                        {transaction!.sender}
                      </Link>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>To</TableCell>
                    <TableCell>
                      <Link
                        component={RouterLink}
                        to={`/transactions?${qs.stringify({
                          term: transaction!.receiver
                        })}`}
                      >
                        {transaction!.receiver}
                      </Link>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Box>
      )}
      <Box>
        {!isSingleTransaction &&
          (!isPending && rows.length > 0 ? (
            <>
              <TableContainer component={Paper}>
                <Table aria-label="Transaction Results">
                  <TableHead>
                    <TableRow>
                      <TableCell>Hash</TableCell>
                      <TableCell>Block</TableCell>
                      <TableCell>From</TableCell>
                      <TableCell>To</TableCell>
                      <TableCell>Value</TableCell>
                      <TableCell>Fee</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(
                      ({ amount, block, hash, sender, receiver, fee }) => (
                        <TableRow key={hash}>
                          <TableCell size="small">
                            <Typography variant="body2" display="block" noWrap>
                              <Link
                                component={RouterLink}
                                to={`/transactions?${qs.stringify({
                                  term: hash
                                })}`}
                              >
                                {hash}
                              </Link>
                            </Typography>
                          </TableCell>
                          <TableCell size="small">
                            <Typography variant="body2" display="block" noWrap>
                              <Link
                                component={RouterLink}
                                to={`/transactions?${qs.stringify({
                                  term: block
                                })}`}
                              >
                                {block}
                              </Link>
                            </Typography>
                          </TableCell>
                          <TableCell size="small">
                            <Typography variant="body2" display="block" noWrap>
                              <Link
                                component={RouterLink}
                                to={`/transactions?${qs.stringify({
                                  term: sender
                                })}`}
                              >
                                {sender}
                              </Link>
                            </Typography>
                          </TableCell>
                          <TableCell size="small">
                            <Typography variant="body2" display="block" noWrap>
                              <Link
                                component={RouterLink}
                                to={`/transactions?${qs.stringify({
                                  term: receiver
                                })}`}
                              >
                                {receiver}
                              </Link>
                            </Typography>
                          </TableCell>
                          <TableCell size="small">{amount}</TableCell>
                          <TableCell size="small">{fee}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {count > rows.length && (
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={count}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              )}
            </>
          ) : (
            <ActivityIndicator pending={isPending}>
              {isPending ? <>Fetching transactions...</> : <>No results</>}
            </ActivityIndicator>
          ))}
      </Box>
    </>
  );
};
