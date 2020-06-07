import React, { ReactNode, FunctionComponent, useMemo, HTMLAttributes } from 'react';
import {
  Paper,
  TableContainer,
  TableContainerProps,
  TableBody,
  TableHead,
  TableCellProps,
  TableProps as MuiTableProps,
  TableRow,
  Typography
} from '@material-ui/core';
import humanizeString from 'humanize-string';
import { useBreakpoints } from '~hooks';
import { Table, TableCell, IconButtonHeaderCell } from './ResponsiveTable.styled';
import CollapsibleTableRow from './CollapsibleTableRow';

export type ColumnData<T, K extends keyof T> = TableCellProps & {
  title?: string;
  name: string;
  value?: (row: T, options?: ColumnData<T, K>) => any;
  primary?: boolean;
  format?: (value: any, options?: ColumnData<T, K>) => ReactNode;
  noWrap?: boolean;
  hidden?: boolean;
  summary?: FunctionComponent<T>;
  media?: {
    [breakpoint: string]: Omit<ColumnData<T, K>, 'name'>
  },
  width?: string;
}

export interface ResponsiveTableProps<T> extends Omit<MuiTableProps, 'children' | 'summary'> {
  rows: T[];
  columns: Array<ColumnData<T, keyof T>>;
  detail?: FunctionComponent<T>;
  summary?: FunctionComponent<T>;
  containerProps?: TableContainerProps;
  media?: {
    [breakpoint: string]: Partial<ResponsiveTableProps<T>>
  }
}

export default <T extends {}>({ media = {}, ...props }: ResponsiveTableProps<T>) => {
  const mediaMatches = useBreakpoints();
  console.log('render...', props);
  const {
    rows = [],
    columns = [],
    detail: DetailView,
    summary: SummaryView,
    containerProps,
    ...tableProps
  } = useMemo(() => {
    return Object.entries(media).reduce((result, [ breakpoint, props ]) => {
      if (mediaMatches[breakpoint]) {
        return {
          ...result,
          ...props
        }
      }

      return result;
    }, props);
  }, [media, props, mediaMatches]);

  console.log('mediaMatches: ', columns, mediaMatches);

  const primaryKey = useMemo(() => {
    return [...columns]
      .filter(({ primary }) => primary)
      .map(({ name }) => name)[0] || columns[0]?.name;
  }, [columns]);

  const mediaColumns = useMemo(() => {
    return columns.map(({ media = {}, ...props }) => {
      return Object.entries(media).reduce((result, [ breakpoint, props ]) => {
        if (mediaMatches[breakpoint]) {
          return {
            ...result,
            ...props
          }
        }

        return result;
      }, props);
    })
  }, [columns, mediaMatches])

  const visibleColumns = useMemo(() => {
    return mediaColumns.filter(({ hidden }) => !hidden);
  }, [mediaColumns]);

  const computedRows = useMemo(() => {
    return rows.map((row) =>
      Object.assign({}, ...columns.map(({
        name,
        value = row => row[name],
        ...options
      }) => ({
        [name]: value(row, {
          name,
          value,
          ...options
        })
      })))
    );
  }, [rows, columns]);

  const formattedRows = useMemo(() => {
    return computedRows.map((row) =>
      Object.assign({}, ...columns.map(({
        name,
        format = value => new String(value)
      }) => ({
        [name]: format(row[name])
      })))
    );
  }, [computedRows, columns]);

  return (
    <TableContainer component={Paper} {...containerProps}>
      <Table {...tableProps}>
        <TableHead>
          <TableRow>
            {visibleColumns.map(({ name, title = humanizeString(name), primary, noWrap, ...props }) => (
              <TableCell key={name} {...props}>{title}</TableCell>
            ))}
            {!!DetailView && (
              <IconButtonHeaderCell/>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {formattedRows.map(row => (
            <CollapsibleTableRow
              key={primaryKey && row[primaryKey] || JSON.stringify(row)}
              detail={DetailView ? (
                <DetailView {...row}></DetailView>
               ) : undefined}
              summary={SummaryView ? (
                <SummaryView {...row}></SummaryView>
              ) : undefined}
            >
              {visibleColumns.map(({
                name,
                primary,
                noWrap,
                summary: ColumnSummaryView,
                ...props
              }) => (
                <TableCell
                  key={name}
                  valign="top"
                  {...props}
                >
                  <Typography variant="body2" noWrap={noWrap} component="div">
                    {row[name]}
                  </Typography>
                  {!!ColumnSummaryView && (
                    <ColumnSummaryView {...row}/>
                  )}
                </TableCell>
              ))}
            </CollapsibleTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
