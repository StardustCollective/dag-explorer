import React, { ReactNode, Children, useState } from 'react';
import { Table, TableRow, TableCell, TableRowProps, Collapse } from '@material-ui/core';
import { CollapsibleTableRow, BlockCell, IconButton, DetailTableRow, DetailTableCell } from './CollapsibleTableRow.styled';
import * as Icon from '@material-ui/icons';

export type CollapsibleTableRowProps = TableRowProps & {
  detail?: ReactNode;
}

export default ({ children, detail, ...props }: CollapsibleTableRowProps) => {
  const [open, setOpen] = useState(false);
  const columnCount = Children.toArray(children).length;

  return (
    <>
      <CollapsibleTableRow {...props}>
        {children}
        {!!detail && (
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <Icon.KeyboardArrowUp /> : <Icon.KeyboardArrowDown />}
            </IconButton>
          </TableCell>
        )}
      </CollapsibleTableRow>
      {!!detail && (
        <DetailTableRow>
          <TableCell colSpan={columnCount + 1}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table>
                <TableRow>
                  <DetailTableCell>
                    {detail}
                  </DetailTableCell>
                </TableRow>
              </Table>
            </Collapse>
          </TableCell>
        </DetailTableRow>
      )}
    </>
  )
}