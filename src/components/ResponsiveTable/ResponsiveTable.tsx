import React from 'react';
import { TableProps } from '@material-ui/core';
import { Table } from './ResponsiveTable.styled';

export default ({ children }: TableProps) => <Table>{children}</Table>;
