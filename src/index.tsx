import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import theme from './theme';
import App from './App';
import 'regenerator-runtime/runtime';
import 'whatwg-fetch';
import '@openfonts/poppins_all';

const GlobalStyle = createGlobalStyle(
  () => `
  /* Add global styles not provided by mui... */
`
);

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyle />
        <Router basename={process.env.PUBLIC_PATH}>
          <App />
        </Router>
      </ThemeProvider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);
