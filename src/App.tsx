import React from 'react';
import { Route, Switch } from 'react-router';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { CssBaseline } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import * as Icon from '@material-ui/icons';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { App, Main, Content } from './App.styled';
import { Logo } from '~assets';
import { Dashboard, Transactions, About, Search } from '~pages';

export default () => {
  // const location = useLocation();
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
            {!matchesSmUp && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <Icon.Menu />
              </IconButton>
            )}
            <Logo />
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
