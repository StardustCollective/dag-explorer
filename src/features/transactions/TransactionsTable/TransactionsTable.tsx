import React from 'react';
import { Box, Typography, TableContainer, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import * as Icon from '@material-ui/icons';
import { ResponsiveTable } from '~components';
import { TransactionInfo } from '~api';

export interface TransactionsTableProps {
  rows: TransactionInfo[]
}

export default ({ rows }: TransactionsTableProps) => (
  <ResponsiveTable
    rows={rows}
    columns={[
      {
        name: 'hash',
        primary: true,
        noWrap: true,
        media: {
          mdDown: {
            summary: (row: TransactionInfo) => (
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
      {
        name: 'block',
        noWrap: true,
        media: {
          mdDown: {
            hidden: true
          }
        }
      },
      {
        name: 'sender',
        noWrap: true,
        media: {
          mdDown: {
            hidden: true
          }
        }
      },
      {
        name: 'receiver',
        noWrap: true,
        media: {
          mdDown: {
            hidden: true
          }
        }
      },
      {
        name: 'amount',
        media: {
          mdDown: {
            align: 'right',
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
          }
        }
      },
      {
        name: 'fee',
        media: {
          mdDown: {
            hidden: true
          }
        }
      }
    ]}
  />
);