import styled, { css } from 'styled-components';
import * as Mui from '@material-ui/core';

export const DetailToggleCell = styled(Mui.TableCell)`
  width: 24px;
  padding-right: 0;
  padding-left: 0;
`;

export const SummaryTableRow = styled(Mui.TableRow)<{
  hasDetail?: boolean;
}>`
  ${({ hasDetail }) => hasDetail && css`
    > * {
      border-bottom: unset;
    }
  `}
`;

export const DetailTableRow = styled(Mui.TableRow)`
  > * {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

export const DetailTableCell = styled(Mui.TableCell)`
  padding-top: 0;
  padding-left: 0;
  padding-right: 0;
  border-bottom: unset;
`

export const SummaryTableCell = styled(Mui.TableCell)`
  padding-top: 0;
`

export const IconButton = styled(Mui.IconButton)`
  padding: 0;
`;

export const BlockCell = styled(Mui.TableCell).attrs(() => ({
  display: 'block'
}))``;

export const CollapsibleTableRow = styled(Mui.TableRow)<{
  hasDetail?: boolean;
  hasSummary?: boolean;
}>`

  ${({ hasDetail, hasSummary }) => (hasDetail || hasSummary) && css`
    > * {
      border-bottom: unset;

      ${hasSummary && css`
        &:not(${DetailToggleCell}) {
          padding-bottom: 0;
        }
      `}
    }
  `}
`;