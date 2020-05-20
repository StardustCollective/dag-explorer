import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useHistory, Link as RouterLink } from 'react-router-dom';
import qs from 'qs';
import { Subscription } from 'rxjs';
import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { ActivityIndicator } from '~components';
import SearchForm from '~features/transactions/SearchForm';
import {
  PagedResult,
  Block,
  Transaction,
  SearchParams,
  fetchBlocks,
  observeInfo,
  fetchTransactions,
  Info
} from '~api';
import { latestInfo } from '~api/latest-info';

export default () => {
  const location = useLocation();
  const history = useHistory();
  const params = useMemo(() => qs.parse(location.search.replace(/^\?/, '')), [
    location
  ]);
  const { term, keys } = params;

  const [isBlocksPending, setBlocksPending] = useState<boolean>(false);
  const [blocksPerPage, setBlocksPerPage] = useState<number>(9);
  const [snapshotHeight, setSnapshotHeight] = useState<number>(-1);
  const [cleanupInfo, setCleanupState] = useState<boolean>(false);
  const [{ rows: blocks, count: blockCount }, setBlockResult] = useState<
    PagedResult<Block>
  >({
    rows: [],
    count: 0
  });

  const [isTransactionsPending, setTransactionsPending] = useState<boolean>(
    false
  );
  const [transactionsPerPage, setTransactionsPerPage] = useState<number>(9);
  const [
    { rows: transactions, count: txCount },
    setTransactionResult
  ] = useState<PagedResult<Transaction>>({ rows: [], count: 0 });

  let infoSubscription: Subscription;

  useEffect(() => {
    if (!infoSubscription) {
      infoSubscription = observeInfo().subscribe(info => {
        latestInfo.update(info);
        setSnapshotHeight(info.blockHeight);
      });
    }

    return function cleanup() {
      infoSubscription.unsubscribe();
    };
  }, [cleanupInfo]);

  useEffect(() => {
    if (snapshotHeight > 0) {
      fetchBlocks({ startAt: 0, endAt: blocksPerPage }).then(payload => {
        setBlocksPending(false);
        setBlockResult(payload);
      });
    }
  }, [blocksPerPage, snapshotHeight]);

  useEffect(() => {
    if (snapshotHeight > 0) {
      setTransactionsPending(true);
      fetchTransactions({ startAt: 0, endAt: transactionsPerPage }).then(
        payload => {
          setTransactionResult(payload);
          setTransactionsPending(false);
        }
      );
    }
  }, [transactionsPerPage, snapshotHeight]);

  const handleSearch = ({ term, keys }: SearchParams<Transaction>) => {
    history.push({
      pathname: '/transactions',
      search: qs.stringify({ term, keys })
    });
  };

  return (
    <>
      <Box mb={2}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h1">
              Dashboard
            </Typography>
            <SearchForm term={term} keys={keys} onFormSubmit={handleSearch} />
          </CardContent>
        </Card>
      </Box>
      <Box display="flex" m={-2}>
        <Box flexGrow={1} p={2}>
          <Paper>
            <TableContainer>
              <Box p={1}>
                <Typography variant="h6" component="h3">
                  Latest Blocks
                </Typography>
              </Box>
              <Table aria-label="Latest Blocks Results">
                <TableHead>
                  <TableRow>
                    <TableCell>Height</TableCell>
                    <TableCell>Hash</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {blocks.map(
                    ({ hash, aggr: { dagAmount, txCount }, height }) => (
                      <TableRow key={hash}>
                        <TableCell size="small">
                          <Typography variant="body2" display="block" noWrap>
                            {height}
                          </Typography>
                        </TableCell>
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
                            {dagAmount} DAG
                          </Typography>
                          <Typography variant="body2" display="block" noWrap>
                            {txCount} Transactions
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {blocks.length < blockCount && (
              <Box p={2} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setBlocksPending(true);
                    setBlocksPerPage(blocksPerPage + 10);
                  }}
                >
                  <ActivityIndicator pending={isBlocksPending}>
                    Load more
                  </ActivityIndicator>
                </Button>
              </Box>
            )}
          </Paper>
        </Box>
        <Box flexGrow={1} p={2}>
          <Paper>
            <TableContainer>
              <Box p={1}>
                <Typography variant="h6" component="h3">
                  Latest Transactions
                </Typography>
              </Box>
              <Table aria-label="Latest Transactions Results">
                <TableHead>
                  <TableRow>
                    <TableCell>Hash</TableCell>
                    <TableCell>From / To</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map(({ hash, sender, receiver, amount }) => (
                    <TableRow key={hash}>
                      <TableCell size="small">
                        <Typography variant="body2" display="block" noWrap>
                          <Link
                            component={RouterLink}
                            to={`/transactions?${qs.stringify({ term: hash })}`}
                          >
                            {hash}
                          </Link>
                        </Typography>
                      </TableCell>
                      <TableCell size="small">
                        <Typography variant="body2" display="block" noWrap>
                          From:{' '}
                          <Link
                            component={RouterLink}
                            to={`/transactions?${qs.stringify({
                              term: sender
                            })}`}
                          >
                            {sender}
                          </Link>
                        </Typography>
                        <Typography variant="body2" display="block" noWrap>
                          To:{' '}
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
                      <TableCell size="small">
                        <Typography variant="body2" display="block" noWrap>
                          {amount} DAG
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {transactions.length < txCount && (
              <Box p={2} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setTransactionsPending(true);
                    setTransactionsPerPage(transactionsPerPage + 10);
                  }}
                >
                  <ActivityIndicator pending={isTransactionsPending}>
                    Load more
                  </ActivityIndicator>
                </Button>
              </Box>
            )}
          </Paper>
        </Box>
      </Box>
    </>
  );
};
