import React, { useEffect, useState, useMemo, ReactNode } from 'react';
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

const getSearchLink = (term: string): ReactNode => (
  <Link
    component={RouterLink}
    to={`/search?${qs.stringify({ term })}`}
  >
    {term}
  </Link>
);

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
                        {getSearchLink(block!.hash)}
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
                        {getSearchLink(transaction!.block)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>From</TableCell>
                    <TableCell>
                      <Typography variant="body2" display="block" noWrap>
                        {getSearchLink(transaction!.sender)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>To</TableCell>
                    <TableCell>
                      <Typography variant="body2" display="block" noWrap>
                        {getSearchLink(transaction!.receiver)}
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
            <TableContainer component={Paper}>
              <ResponsiveTable
                columns={[
                  {
                    title: 'Transaction',
                    field: 'hash',
                    format: getSearchLink
                  },
                  {
                    title: 'Block',
                    field: 'block',
                    format: getSearchLink
                  },
                  {
                    title: 'From',
                    field: 'sender',
                    format: getSearchLink
                  },
                  {
                    title: 'To',
                    field: 'receiver',
                    format: getSearchLink
                  },
                  { title: 'Value', field: 'amount' },
                  { title: 'Fee', field: 'fee' }
                ]}
                rows={rows}
              />
            </TableContainer>
          ) : (
            <ActivityIndicator pending={isPending}>
              {isPending ? <>Fetching transactions...</> : <>No results</>}
            </ActivityIndicator>
          ))}
      </Box>
    </>
  );
};
