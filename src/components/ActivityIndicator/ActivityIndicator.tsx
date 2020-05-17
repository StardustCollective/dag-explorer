import React, { ReactNode } from 'react';
import { CircularProgressProps } from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {
  ActivityIndicator,
  ProgressIndicator
} from './ActivityIndicator.styled';

export interface ActivityIndicatorProps extends CircularProgressProps {
  children: ReactNode;
  pending?: boolean;
}

export default ({
  children,
  pending = true,
  size = '1.2em',
  ...props
}: ActivityIndicatorProps) => (
  <ActivityIndicator pending={pending}>
    <ProgressIndicator size={size} disableShrink color="inherit" {...props} />
    <Box ml={pending ? 1 : 0}>
      <Typography>{children}</Typography>
    </Box>
  </ActivityIndicator>
);
