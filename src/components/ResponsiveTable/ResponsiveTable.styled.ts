import styled, { css } from 'styled-components';
import { Table as MuiTable } from '@material-ui/core';

export const Table = styled(MuiTable)`
  table-layout: fixed;

  ${({ theme }) => theme.breakpoints.down('md')} {
    td,
    th {
      display: block;
      box-sizing: border-box;
      max-width: none;
      width: 100%;
      border-top: 0;

      &:not(:last-child) {
        border-bottom: 0;
        padding-bottom: 0;
      }
    }
  }
`;
