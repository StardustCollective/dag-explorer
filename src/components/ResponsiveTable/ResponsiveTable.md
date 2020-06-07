<h3>Example</h3>


```js
import ResponsiveTable from '.';
import { Box, Typography, TableContainer, Table, TableBody, TableRow, TableHeaderCell, TableCell } from '@material-ui/core';
import * as Icon from '@material-ui/icons';

const rows = Array.from(Array(10), (_, index) => ({
  id: index,
  hash: '19713e56a3bb3dd405bda984f4669718e8dc9990cc284bfad84f1844bfdb7f15',
  block: '19713e56a3bb3dd405bda984f4669718e8dc9990cc284bfad84f1844bfdb7f15',
  sender: '19713e56a3bb3dd405bda984f4669718e8dc9990cc284bfad84f1844bfdb7f15',
  receiver: '19713e56a3bb3dd405bda984f4669718e8dc9990cc284bfad84f1844bfdb7f15',
  amount: '23467 EUR',
  fee: '123 EUR'
}));

const columns = [
  {
    name: 'id',
    primary: true,
    hidden: true
  },
  {
    name: 'hash',
    noWrap: true,
    media: {
      mdDown: {
        summary: (row) => (
          <Box display="flex" alignItems="center">
            <Box display="flex" mr="0.1rem">
              <Icon.Telegram fontSize="inherit"/> 
            </Box>
            <Box display="flex">
              <Typography component="span" variant="subtitle1" style={{ maxWidth: 60, lineHeight: 1 }} noWrap>
                {row.sender}
              </Typography>
              <Typography component="span" variant="subtitle1" style={{ maxWidth: 60, lineHeight: 1 }}> ⇨ </Typography>
              <Typography variant="subtitle1" component="span" style={{ maxWidth: 60, lineHeight: 1 }} noWrap>
                {row.receiver}
              </Typography>
            </Box>
          </Box>
        )
      }
    }
  },
  { name: 'block', noWrap: true, media: { mdDown: { hidden: true } } },
  { name: 'sender', noWrap: true, media: { mdDown: { hidden: true } } },
  { name: 'receiver', noWrap: true, media: { mdDown: { hidden: true } } },
  {
    name: 'amount',
    media: {
      mdDown: {
        align: 'right',
        summary: (row) => (
          <Box display="flex" ml="auto" justifyContent="flex-end" alignItems="center">
            <Box display="flex" mr={1} mr="0.1rem">
              <Icon.MoneyOff fontSize="inherit"/> 
            </Box>
            <Typography variant="subtitle1" component="div" style={{ maxWidth: 60, lineHeight: 1 }} noWrap>
              {row.fee}
            </Typography>
          </Box>
        )
      }
    }},
  { name: 'fee', media: { mdDown: { hidden: true } } }
];

const TransactionsDetailTable = (transaction) => {
  return (
    <div style={{ overflow: 'auto', width: '100%' }}>
      <Table aria-label="Transaction Details">
        <TableBody>
          <TableRow>
            <TableCell variant="head">Hash</TableCell>
            <TableCell>
              <Typography noWrap>
                {transaction.hash}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Block</TableCell>
            <TableCell>
              <Typography noWrap>
                {transaction.block}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">From</TableCell>
            <TableCell>
              {transaction.sender}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">To</TableCell>
            <TableCell>
              {transaction.receiver}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

const TransactionTableSummary = (row) => {
  return (
    <Box display="flex">
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box display="flex" mr="0.1rem">
          <Icon.Telegram fontSize="inherit"/> 
        </Box>
        <Box display="flex">
          <Typography component="span" variant="subtitle1" style={{ maxWidth: 60, lineHeight: 1 }} noWrap>
            {row.sender}
          </Typography>
          <Typography component="span" variant="subtitle1" style={{ maxWidth: 60, lineHeight: 1 }}> ⇨ </Typography>
          <Typography variant="subtitle1" component="span" style={{ maxWidth: 60, lineHeight: 1 }} noWrap>
            {row.receiver}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" ml="auto" justifyContent="center" alignItems="center">
        <Box display="flex" mr={1} mr="0.1rem">
          <Icon.MoneyOff fontSize="inherit"/> 
        </Box>
        <Typography variant="subtitle1" component="div" style={{ maxWidth: 60, lineHeight: 1 }} noWrap>
          {row.fee}
        </Typography>
      </Box>
    </Box>
  )
}

const MyTable = ({ rows, columns }) => {
  console.log('RENDER MY TABLE: ', rows, columns);

  React.useEffect(() => {
    console.log('mount');
  }, []);

  return (
    <ResponsiveTable
      columns={columns}
      rows={rows}
      media={{
        mdDown: {
          detail: TransactionsDetailTable,
          // summary: TransactionTableSummary
        }
      }}
    />
  );
};

<MyTable rows={rows} columns={columns}></MyTable>
```