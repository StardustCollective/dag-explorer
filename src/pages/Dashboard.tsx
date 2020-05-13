import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'qs';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import SearchForm from '~features/transactions/SearchForm';
import {
  PagedResult,
  Block,
  Transaction,
  SearchParams,
  fetchBlocks,
  fetchTransactions
} from '~api';

export default () => {
  const location = useLocation();
  const history = useHistory();
  const params = useMemo(() => qs.parse(location.search.replace(/^\?/, '')), [
    location
  ]);
  const { term, keys } = params;
  const [{ rows: blocks }, setBlockResult] = useState<PagedResult<Block>>({
    rows: [],
    count: 0
  });
  const [{ rows: transactions }, setTransactionResult] = useState<
    PagedResult<Transaction>
  >({ rows: [], count: 0 });

  useEffect(() => {
    fetchBlocks({ startAt: 0, endAt: 9 }).then(setBlockResult);
    fetchTransactions({ startAt: 0, endAt: 9 }).then(setTransactionResult);
  }, []);

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
          <TableContainer component={Paper}>
            <Box p={1}>
              <Typography variant="h6" component="h3">
                Latest Blocks
              </Typography>
            </Box>
            <Table aria-label="simple table">
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
                          {hash}
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
        </Box>
        <Box flexGrow={1} p={2}>
          <TableContainer component={Paper}>
            <Box p={1}>
              <Typography variant="h6" component="h3">
                Latest Transactions
              </Typography>
            </Box>
            <Table aria-label="simple table">
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
                        {hash}
                      </Typography>
                    </TableCell>
                    <TableCell size="small">
                      <Typography variant="body2" display="block" noWrap>
                        From: {sender}
                      </Typography>
                      <Typography variant="body2" display="block" noWrap>
                        To: {receiver}
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
        </Box>
      </Box>
    </>
  );
};
