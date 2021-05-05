import React from 'react';
import { Route, Switch } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import { CssBaseline } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

import { App, Main, Content } from './App.styled';
import { Logo } from '~assets';
import { Dashboard, Transactions, About, Search } from '~pages';

const CustomToolBar = withStyles({
  root: {
    background: '#00152F',
    display: 'flex',
    minHeight: '60px'
  }
})(Toolbar);

const CustomTypography = withStyles({
  root: {
    color: 'white',
    marginLeft: '9px'
  }
})(Typography);

export default () => {
  return (
    <App>
      <CssBaseline />
      <Main>
        <AppBar position="sticky" color="inherit">
          <CustomToolBar>
            <Logo />
            <CustomTypography>Network Tools</CustomTypography>
          </CustomToolBar>
        </AppBar>
        <Content>
          <Switch>
            <Route path="/" exact={true} component={Dashboard} />
            <Route path="/search" exact={true} component={Search} />
            <Route path="/transactions" exact={true} component={Transactions} />
            <Route path="/about" exact={true} component={About} />
          </Switch>
        </Content>
      </Main>
    </App>
  );
};
