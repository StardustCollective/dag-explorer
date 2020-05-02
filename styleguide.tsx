import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './src/theme';

export default ({ children }: { children: ReactNode }) => (
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </MuiThemeProvider>
);
