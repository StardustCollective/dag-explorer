import React, { ReactNode, Children, useState } from 'react';
import { Table, TableBody, TableRow, TableCell, TableRowProps, Collapse } from '@material-ui/core';
import { CollapsibleTableRow, DetailToggleCell, IconButton, DetailTableRow, DetailTableCell, SummaryTableCell, SummaryTableRow } from './CollapsibleTableRow.styled';
import * as Icon from '@material-ui/icons';

export type CollapsibleTableRowProps = TableRowProps & {
  detail?: ReactNode;
  summary?: ReactNode;
}

export default ({ children, detail, summary, ...props }: CollapsibleTableRowProps) => {
  const [open, setOpen] = useState(false);
  const columnCount = Children.toArray(children).length;
  const hasDetail = !!detail;
  const hasSummary = !!summary;

  console.log('collapsible: ', detail, !!detail, 'summary: ', summary);

  return (
    <>
      <CollapsibleTableRow {...props} hasDetail={hasDetail} hasSummary={hasSummary}>
        {children}
        {!!detail && (
          <DetailToggleCell rowSpan={hasSummary ? 2 : 1} valign="top">
            <IconButton aria-label="expand row" size="small" onClick={() => {
              setOpen(!open)
            }}>
              {open ? <Icon.KeyboardArrowUp /> : <Icon.KeyboardArrowDown />}
            </IconButton>
          </DetailToggleCell>
        )}
      </CollapsibleTableRow>
      {!!summary && (
        <SummaryTableRow hasDetail={hasDetail}>
          <SummaryTableCell colSpan={columnCount}>
            {summary}
          </SummaryTableCell>
        </SummaryTableRow>
      )}
      {!!detail && (
        <DetailTableRow>
          <TableCell colSpan={columnCount + 1}>
            <Collapse in={open} timeout="auto" unmountOnExit={true}>
              <Table style={{ tableLayout: 'fixed' }}>
                <TableBody>
                  <TableRow>
                    <DetailTableCell>
                      {detail}
                    </DetailTableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </DetailTableRow>
      )}
    </>
  )
}