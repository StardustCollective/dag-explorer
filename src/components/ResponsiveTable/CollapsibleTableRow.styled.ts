import styled from 'styled-components';
import * as Mui from '@material-ui/core';

export const CollapsibleTableRow = styled(Mui.TableRow)`
  > * {
    border-bottom: unset;

    &:last-child {
      width: 24px;
      padding-right: 0;
    }
  }
`;

export const DetailTableRow =styled(Mui.TableRow)`
  > * {
    padding-top: 0;
    padding-bottom: 0;
  }
`

export const DetailTableCell = styled(Mui.TableCell)`
  padding-top: 0;
  padding-left: 0;
  padding-right: 0;
  border-bottom: unset;
`

export const IconButton = styled(Mui.IconButton)`
  padding: 0;
`;

export const BlockCell = styled(Mui.TableCell).attrs(() => ({
  display: 'block'
}))``;