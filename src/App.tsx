import React from 'react';
import { Route, Switch } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { CssBaseline, Container, Link, Toolbar } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { App, Main, Content } from './App.styled';
import { Logo } from '~assets';
import { Dashboard, Transactions, About, Search } from '~pages';

export default () => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const matchesSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <App>
      <CssBaseline />
      <Main>
        <AppBar position="sticky" color="inherit">
          <Toolbar>
            <Link component={RouterLink} to="/" color="inherit">
              <Logo />
            </Link>
          </Toolbar>
        </AppBar>
        <Content>
          <Container>
            <Switch>
              <Route path="/" exact={true} component={Dashboard} />
              <Route path="/search" exact={true} component={Search} />
              <Route
                path="/transactions"
                exact={true}
                component={Transactions}
              />
              <Route path="/about" exact={true} component={About} />
            </Switch>
          </Container>
        </Content>
      </Main>
    </App>
  );
};
