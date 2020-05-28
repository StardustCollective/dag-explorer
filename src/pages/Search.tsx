import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useHistory, Link as RouterLink } from 'react-router-dom';
import qs from 'qs';
import {
  Box,
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
import Skeleton from '@material-ui/lab/Skeleton';
import { IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { ActivityIndicator, ResponsiveTable } from '~components';
import SearchForm from '~features/transactions/SearchForm';
import { SearchParams } from '~api';
import { searchRequest } from '~api/search';
import { AddressInfo, BlockInfo, TransactionInfo } from '~api/types';

export default () => {
  const location = useLocation();
  const history = useHistory();
  const params = useMemo(() => qs.parse(location.search.replace(/^\?/, '')), [
    location
  ]);
  const { term } = params;
  const [isPending, setPending] = useState<boolean>(true);
  const [rows, setTransactionResult] = useState<TransactionInfo[]>([]);
  // const { rows = [], count = -1 } = transactionResult || {};
  const [address, setAddress] = useState<AddressInfo | null>(null);
  const [block, setBlock] = useState<BlockInfo | null>(null);

  const isSingleTransaction = term && !address && !block && rows.length === 1;
  const transaction = isSingleTransaction ? rows[0] : null;

  const handleSearch = ({ term }: SearchParams<TransactionInfo>) => {
    history.push({ search: qs.stringify({ term }) });
  };

  useEffect(() => {
    setPending(true);
    searchRequest(term, {
      onTx: r => {
        setBlock(null);
        setAddress(null);
        setTransactionResult([r]);
      },
      onBlock: r => {
        setAddress(null);
        setBlock(r.block);
        setTransactionResult(r.txs);
      },
      onAddress: r => {
        setBlock(null);
        setAddress(r.balance);
        setTransactionResult(r.txs);
      },
      onNotFound: () => {
        setBlock(null);
        setAddress(null);
        setTransactionResult([]);
      }
    }).then(() => {
      setPending(false);
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
      {address && (
        <Box mb={2}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
                Address
              </Typography>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell size="small">Balance</TableCell>
                    <TableCell>
                      {(address && `${address.balance / 1e8} $DAG`) || (
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
      {block && (
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
                      <Typography variant="body2" display="block" noWrap>
                        <Link
                          component={RouterLink}
                          to={`/search?${qs.stringify({
                            term: block!.hash
                          })}`}
                        >
                          {block!.hash}
                        </Link>
                      </Typography>
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
                    <TableCell>
                      <Typography variant="body2" display="block" noWrap>
                        {transaction!.hash}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Block</TableCell>
                    <TableCell>
                      <Typography variant="body2" display="block" noWrap>
                        <Link
                          component={RouterLink}
                          to={`/search?${qs.stringify({
                            term: transaction!.block
                          })}`}
                        >
                          {transaction!.block}
                        </Link>
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>From</TableCell>
                    <TableCell>
                      <Typography variant="body2" display="block" noWrap>
                        <Link
                          component={RouterLink}
                          to={`/search?${qs.stringify({
                            term: transaction!.sender
                          })}`}
                        >
                          {transaction!.sender}
                        </Link>
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>To</TableCell>
                    <TableCell>
                      <Typography variant="body2" display="block" noWrap>
                        <Link
                          component={RouterLink}
                          to={`/search?${qs.stringify({
                            term: transaction!.receiver
                          })}`}
                        >
                          {transaction!.receiver}
                        </Link>
                      </Typography>
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
                <ResponsiveTable aria-label="Transaction Results">
                  <TableHead>
                    <TableRow>
                      <TableCell>Transaction</TableCell>
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
                                to={`/search?${qs.stringify({
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
                                to={`/search?${qs.stringify({
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
                                to={`/search?${qs.stringify({
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
                                to={`/search?${qs.stringify({
                                  term: receiver
                                })}`}
                              >
                                {receiver}
                              </Link>
                            </Typography>
                          </TableCell>
                          <TableCell size="small">{amount / 1e8}</TableCell>
                          <TableCell size="small">{fee}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </ResponsiveTable>
              </TableContainer>
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
