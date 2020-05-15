import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import 'moment/min/locales';
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
import SearchForm from '~features/transactions/SearchForm';

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
  const { startAt = 0, endAt = 9, term, keys } = params;
  const rowsPerPage = +endAt - +startAt + 1;
  const [{ rows, count }, setTransactionResult] = useState<
    PagedResult<Transaction>
  >({
    count: -1,
    rows: []
  });

  const page = count ? ~~(+startAt / rowsPerPage) : 0;
  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    nextPage: number
  ) => {
    history.push({
      search: qs.stringify({
        term,
        keys,
        startAt: nextPage * rowsPerPage,
        endAt: nextPage * rowsPerPage + rowsPerPage
      })
    });
  };

  const handleChangeRowsPerPage = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    history.push({
      search: qs.stringify({ term, keys, startAt, endAt: startAt + value })
    });
  };

  const handleSearch = ({ term, keys }: SearchParams<Transaction>) => {
    history.push({ search: qs.stringify({ term, keys, rowsPerPage }) });
  };

  useEffect(() => {
    fetchTransactions({
      startAt,
      endAt,
      keys,
      term
    }).then(payload => setTransactionResult(payload));
  }, [location]);

  return (
    <>
      <Box mb={2}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h1">
              Transactions
            </Typography>
            <SearchForm term={term} keys={keys} onFormSubmit={handleSearch} />
          </CardContent>
        </Card>
      </Box>
      <Box>
        {rows.length ? (
          <>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Txn Hash</TableCell>
                    <TableCell>Block Hash</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>From</TableCell>
                    <TableCell>To</TableCell>
                    <TableCell>Value</TableCell>
                    <TableCell>Txn Fee</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(
                    ({ amount, block, hash, sender, receiver, fee }) => (
                      <TableRow key={hash}>
                        <TableCell size="small">
                          <Typography variant="body2" display="block" noWrap>
                            {hash}
                          </Typography>
                        </TableCell>
                        <TableCell size="small">
                          <Typography variant="body2" display="block" noWrap>
                            {block}
                          </Typography>
                        </TableCell>
                        <TableCell size="small">
                          {/*`${moment
                            .duration(moment.now())
                            .humanize()} ago`*/}
                        </TableCell>
                        <TableCell size="small">
                          <Typography variant="body2" display="block" noWrap>
                            {sender}
                          </Typography>
                        </TableCell>
                        <TableCell size="small">
                          <Typography variant="body2" display="block" noWrap>
                            {receiver}
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
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </>
        ) : (
          count === 0 && <Typography component="h6">No results.</Typography>
        )}
      </Box>
    </>
  );
};
