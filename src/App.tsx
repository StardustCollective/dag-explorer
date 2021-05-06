import React from 'react';
import { CssBaseline } from '@material-ui/core';

import { App } from './App.styled';
import Layout from './layout';

export default () => {
  return (
    <App>
      <CssBaseline />
      <Layout />
    </App>
  );
};
