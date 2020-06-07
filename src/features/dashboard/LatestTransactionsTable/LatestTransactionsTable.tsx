import React from 'react';
import { Box, Typography, TableContainer, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import * as Icon from '@material-ui/icons';
import { ResponsiveTable } from '~components';
import { TransactionInfo } from '~api';

export interface LatestTransactionsTableProps {
  rows: TransactionInfo[]
}

export default ({ rows }: LatestTransactionsTableProps) => (
  <ResponsiveTable
    rows={rows}
    columns={[
      {
        name: 'hash',
        primary: true,
        noWrap: true,
        summary: row => (
          <Box display="flex" alignItems="center">
            <Box display="flex" mr="0.1rem">
              <Icon.Widgets fontSize="inherit"/> 
            </Box>
            <Typography variant="subtitle1" component="div" noWrap>
              {row.block}
            </Typography>
          </Box>
        )
      },
      {
        name: 'from-to',
        title: 'From / To',
        align: 'center',
        value: (row: TransactionInfo) => [row.sender, row.receiver],
        format: ([ sender, receiver ]) => (
          <Box display="flex" alignItems="center">
            <Typography variant="inherit" component="span" noWrap>
              {sender}
            </Typography>
            <Typography variant="inherit" component="span"> ⇨ </Typography>
            <Typography variant="inherit" component="span" noWrap>
              {receiver}
            </Typography>
          </Box>
        ),
        primary: true,
      },
      {
        name: 'block',
        hidden: true
      },
      {
        name: 'amount',
        align: 'right',
        noWrap: true,
        width: '20%',
        summary: (row: TransactionInfo) => (
          <Box display="flex" ml="auto" justifyContent="flex-end" alignItems="center">
            <Box display="flex" mr="0.1rem">
              <Icon.MoneyOff fontSize="inherit"/> 
            </Box>
            <Typography variant="subtitle1" component="div" style={{ maxWidth: 60, lineHeight: 1 }} noWrap>
              {row.fee}
            </Typography>
          </Box>
        )
      },
      {
        name: 'fee',
        hidden: true
      }
    ]}
  />
);