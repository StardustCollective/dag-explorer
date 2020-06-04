import React, { ReactNode, FunctionComponent, useMemo } from 'react';
import { TableBody, TableHead, TableCellProps, TableProps as MuiTableProps, Typography } from '@material-ui/core';
import { useBreakpoints } from '~hooks';
import { Table, TableCell } from './ResponsiveTable.styled';
import TableRow from './CollapsibleTableRow';

export type ColumnData<T> = TableCellProps & {
  title?: string;
  field: string;
  primary?: boolean;
  format?: (value: T) => ReactNode; // TODO: Add default formatters, e.g. number
  noWrap?: boolean;
  /** Specify theme breakpoint */
  mediaHidden?: string;
  // TODO: Add option to render hidden columns or other content below the actual columns content
}

export interface ResponsiveTableProps<T> extends Omit<MuiTableProps, 'children'> {
  rows: T[];
  columns: Array<ColumnData<keyof T>>;
  detail?: FunctionComponent<T>;
}

export default <T extends {}>({
  rows,
  columns,
  detail: DetailView,
  ...props
}: ResponsiveTableProps<T>) => {
  const mediaMatches = useBreakpoints();

  const primaryKey = useMemo(() => {
    return columns
      .filter(({ primary }) => primary)
      .map(({ field }) => field)
      .shift() || columns[0]?.field;
  }, [columns]);

  const visibleColumns = useMemo(() => {
    return columns.filter(({ mediaHidden }) =>
      !mediaHidden || !mediaMatches[mediaHidden]
    );
  }, [columns, mediaMatches]);

  const formattedRows = useMemo(() => {
    return rows.map((row) =>
      Object.assign({}, ...columns.map(({
        field,
        format = value => new String(value)
      }) => ({
        [field]: format(row[field])
      })))
    );
  }, [rows, columns]);

  return (
    <Table {...props}>
      <TableHead>
        <TableRow>
          {visibleColumns.map(({ field, title = field, primary, mediaHidden, noWrap, ...props }) => (
            <TableCell key={field} {...props}>{title}</TableCell>
          ))}
          <TableCell/>
        </TableRow>
      </TableHead>
      <TableBody>
        {formattedRows.map(row => (
          <TableRow
            key={primaryKey && row[primaryKey] || JSON.stringify(row)}
            detail={DetailView ? <DetailView {...row}></DetailView> : undefined}
          >
            {visibleColumns.map(({
              field,
              primary,
              mediaHidden,
              noWrap,
              ...props
            }) => (
              <TableCell key={field} {...props}>
                <Typography variant="body2" noWrap={noWrap}>
                  {row[field]}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
);
}
