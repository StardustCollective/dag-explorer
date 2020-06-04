import styled, { css, StyledComponentProps } from 'styled-components';
import * as Mui from '@material-ui/core';

export const TableCell = styled(Mui.TableCell)<{
  shrink?: boolean;
  mediaHidden?: string;
}>`
  ${({ theme, mediaHidden }) => theme.breakpoints.keys.map((breakpoint: string) => css`
    ${theme.breakpoints.down(mediaHidden)} {
      display: none;
    }
  `)}
`;

export const Table = styled(Mui.Table)`
  table-layout: fixed;
`;