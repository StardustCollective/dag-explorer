import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useHistory, Link as RouterLink } from 'react-router-dom';
import qs from 'qs';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
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
import Link from '@material-ui/core/Link';
import Skeleton from '@material-ui/lab/Skeleton';
import { IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import ActivityIndicator from '~components/ActivityIndicator';
import SearchForm from '~features/transactions/SearchForm';
import { SearchParams, fetchPrice, checkPendingTx } from '~api';
import { searchRequest } from '~api/search';
import {
  AddressInfo,
  SnapshotInfo,
  BlockInfo,
  TransactionInfo
} from '~api/types';

export default () => {
  const location = useLocation();
  const history = useHistory();
  const params = useMemo(() => qs.parse(location.search.replace(/^\?/, '')), [
    location
  ]);

  const { term, network } = params;
  const [updated, setUpdated] = useState(0);
  const [isPending, setPending] = useState<boolean>(true);
  const [rows, setTransactionResult] = useState<TransactionInfo[]>([]);
  // const { rows = [], count = -1 } = transactionResult || {};
  const [address, setAddress] = useState<AddressInfo | null>(null);
  const [block, setBlock] = useState<BlockInfo | null>(null);
  const [snapshot, setSnapshot] = useState<SnapshotInfo | null>(null);
  const [fiatPrice, setFiatPrice] = useState<number>(0);

  const isSingleTransaction =
    term && !address && !block && !snapshot && rows.length === 1;
  const transaction = isSingleTransaction ? rows[0] : null;
  const fractionDigits = { minimumFractionDigits: 2, maximumFractionDigits: 8 };

  const handleSearch = ({ term }: SearchParams<TransactionInfo>) => {
    history.push({ search: qs.stringify({ term }) });
  };

  useEffect(() => {
    setPending(true);
    Promise.all([
      searchRequest(term, network, {
        onTx: (r, pending) => {
          if (pending) {
            // check if tx is confirmed every 30 seconds
            const intervalId = setInterval(async () => {
              const status = await checkPendingTx(r.hash);
              if (status) {
                clearInterval(intervalId);
                setUpdated(new Date().getTime());
              }
            }, 30 * 1000);
          }
          setSnapshot(null);
          setBlock(null);
          setAddress(null);
          setTransactionResult([r]);
        },
        onBlock: r => {
          setAddress(null);
          setBlock(r.block);
          setSnapshot(null);
          setTransactionResult(
            r.txs.sort(
              (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
            )
          );
        },
        onSnapshot: r => {
          setAddress(null);
          setBlock(null);
          setSnapshot(r.snapshot);
          setTransactionResult(
            r.txs.sort(
              (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
            )
          );
        },
        onAddress: r => {
          setBlock(null);
          setSnapshot(null);
          setAddress(r.balance);
          setTransactionResult(
            r.txs.sort(
              (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
            )
          );
        },
        onNotFound: () => {
          setBlock(null);
          setSnapshot(null);
          setAddress(null);
          setTransactionResult([]);
        }
      }),
      fetchPrice('usd')
    ]).then(resp => {
      setFiatPrice(resp[1]['usd']);
      setPending(false);
    });
  }, [location, updated]);

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
                  {/*<TableRow>*/}
                  {/*  <TableCell size="small">Address</TableCell>*/}
                  {/*  <TableCell>*/}
                  {/*    {(address && `${address.hash}`) || (*/}
                  {/*      <Skeleton variant="text" />*/}
                  {/*    )}*/}
                  {/*  </TableCell>*/}
                  {/*</TableRow>*/}
                  <TableRow>
                    <TableCell size="small">Balance</TableCell>
                    <TableCell>
                      {(address &&
                        `${(address.balance / 1e8).toLocaleString(
                          navigator.language,
                          fractionDigits
                        )} $DAG ($${(
                          (address.balance * fiatPrice) /
                          1e8
                        ).toLocaleString(navigator.language, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })} USD)`) || <Skeleton variant="text" />}
                    </TableCell>
                  </TableRow>
                  {/*<TableRow>*/}
                  {/*  <TableCell size="small">$DAG Value</TableCell>*/}
                  {/*  <TableCell>*/}
                  {/*    {(address && `${address.balance} $DAG`) || (*/}
                  {/*      <Skeleton variant="text" />*/}
                  {/*    )}*/}
                  {/*  </TableCell>*/}
                  {/*</TableRow>*/}
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
                      <Link
                        component={RouterLink}
                        to={`/search?${qs.stringify({
                          term: block!.hash,
                          network
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
      {snapshot && (
        <Box mb={2}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
                Snapshot
              </Typography>
              <Table aria-label="Snapshot Details">
                <TableBody>
                  <TableRow>
                    <TableCell>Height</TableCell>
                    <TableCell>
                      {Number(snapshot.height).toLocaleString(
                        navigator.language
                      )}{' '}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total DAG</TableCell>
                    <TableCell size="small">
                      {(snapshot &&
                        `${(snapshot.dagAmount / 1e8).toLocaleString(
                          navigator.language,
                          fractionDigits
                        )} ($${(
                          (snapshot.dagAmount * fiatPrice) /
                          1e8
                        ).toLocaleString(navigator.language, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })} USD)`) || <Skeleton variant="text" />}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total Fees</TableCell>
                    <TableCell>
                      {(snapshot!.feeAmount / 1e8).toLocaleString(
                        navigator.language,
                        fractionDigits
                      )}
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
                {transaction!.block ? 'Transaction' : 'Pending Transaction'}
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
                      {transaction?.block ? (
                        <Link
                          component={RouterLink}
                          to={`/search?${qs.stringify({
                            term: transaction!.block,
                            network
                          })}`}
                        >
                          {transaction?.block}
                        </Link>
                      ) : (
                        <>
                          <CircularProgress size={16} />
                          {` (Pending)`}
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>From</TableCell>
                    <TableCell>
                      <Link
                        component={RouterLink}
                        to={`/search?${qs.stringify({
                          term: transaction!.sender,
                          network
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
                        to={`/search?${qs.stringify({
                          term: transaction!.receiver,
                          network
                        })}`}
                      >
                        {transaction!.receiver}
                      </Link>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Amount</TableCell>
                    <TableCell>
                      {(transaction!.amount / 1e8).toLocaleString(
                        navigator.language,
                        fractionDigits
                      )}{' '}
                      $DAG ($
                      {((transaction!.amount * fiatPrice) / 1e8).toLocaleString(
                        navigator.language,
                        fractionDigits
                      )}{' '}
                      USD)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>
                      {moment(transaction!.timestamp).format(
                        'MMM D YYYY h:m:s a'
                      )}
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
                      <TableCell>Transaction</TableCell>
                      <TableCell>From</TableCell>
                      <TableCell>To</TableCell>
                      <TableCell>Value</TableCell>
                      <TableCell>Fee</TableCell>
                      <TableCell>Timestamp</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(
                      ({ amount, hash, sender, receiver, fee, timestamp }) => (
                        <TableRow key={hash}>
                          <TableCell size="small">
                            <Typography variant="body2" display="block" noWrap>
                              <Link
                                component={RouterLink}
                                to={`/search?${qs.stringify({
                                  term: hash,
                                  network
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
                                  term: block,
                                  network
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
                                  term: sender,
                                  network
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
                                  term: receiver,
                                  network
                                })}`}
                              >
                                {receiver}
                              </Link>
                            </Typography>
                          </TableCell>
                          <TableCell size="small">
                            {(amount / 1e8).toLocaleString(
                              navigator.language,
                              fractionDigits
                            )}
                          </TableCell>
                          <TableCell size="small">
                            {(fee / 1e8).toLocaleString(
                              navigator.language,
                              fractionDigits
                            )}
                          </TableCell>
                          <TableCell size="small">
                            {moment(timestamp).format('MMM D YYYY h:m:s a')}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
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
