import React from 'react';
import { Box, Typography, TableContainer, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import { TransactionInfo } from '~api';

/** Renders transaction details */
export default (transaction:  TransactionInfo) => {
  return (
    <TableContainer>
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
    </TableContainer>
  )
}