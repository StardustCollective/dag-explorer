import styled, { css, StyledComponentProps } from 'styled-components';
import * as Mui from '@material-ui/core';

export const IconButtonHeaderCell = styled(Mui.TableCell)`
  width: 24px;
  padding-right: 32px;
  padding-left: 0;
  box-sizing: border-box;
`

export const TableCell = styled(Mui.TableCell)<{
  valign?: 'baseline' | 'middle' | 'top' | 'bottom' | 'inherit' | undefined
}>`
  vertical-align: ${({ valign = 'inherit' }) => valign};
`;

export const Table = styled(Mui.Table)`
  table-layout: fixed;
`;