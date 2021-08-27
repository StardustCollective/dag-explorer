import React, { useMemo } from 'react';
import { Route, Switch, useLocation } from 'react-router';
import qs from 'qs';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Badge, CssBaseline, useMediaQuery } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import * as Icon from '@material-ui/icons';
import Toolbar from '@material-ui/core/Toolbar';
import { App, Main, Content } from './App.styled';
import { Logo } from '~assets';
import { Dashboard, About, Search } from '~pages';

export default () => {
  // const location = useLocation();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const matchesSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const location = useLocation();
  const params = useMemo(() => qs.parse(location.search.replace(/^\?/, '')), [
    location
  ]);

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
            <Logo style={{ flexGrow: '1' }} />
            {params.network === 'ceres' && <Badge>Ceres (Testnet)</Badge>}
          </Toolbar>
        </AppBar>
        <Content>
          <Switch>
            <Route path="/" exact={true} component={Dashboard} />
            <Route path="/search" exact={true} component={Search} />
            <Route path="/about" exact={true} component={About} />
          </Switch>
        </Content>
      </Main>
    </App>
  );
};
