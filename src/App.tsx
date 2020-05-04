import React from 'react';
import { Route, Switch } from 'react-router';
import { useLocation, Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { CssBaseline } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import * as Icon from '@material-ui/icons';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { App, Sidebar, Main, Content } from './App.styled';
import { Logo } from '~assets';
import { Dashboard, Wallet, Transactions, About } from '~pages';

export default () => {
  const location = useLocation();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const matchesSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const drawer = (
    <div>
      <div>
        <Typography variant="h6" noWrap>
          Block Explorer
        </Typography>
      </div>
      <Divider />
      <List>
        <ListItem
          component={Link}
          to="/"
          selected={location.pathname === '/'}
          button
        >
          <ListItemIcon>
            <Icon.Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          component={Link}
          to="/wallet"
          selected={!!location.pathname.startsWith(`/wallet`)}
          button
        >
          <ListItemIcon>
            <Icon.AccountBalanceWallet />
          </ListItemIcon>
          <ListItemText primary="Wallet Information" />
        </ListItem>
        <ListItem
          component={Link}
          to={`/transactions`}
          selected={!!location.pathname.startsWith(`/transactions`)}
          button
        >
          <ListItemIcon>
            <Icon.Telegram />
          </ListItemIcon>
          <ListItemText primary="Transactions" />
        </ListItem>
        <ListItem
          component={Link}
          to={`/about`}
          selected={!!location.pathname.startsWith(`/about`)}
          button
        >
          <ListItemIcon>
            <Icon.Help />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <App>
      <CssBaseline />
      <Sidebar>
        <Drawer
          {...(matchesSmUp
            ? {
                variant: 'permanent',
                open: true
              }
            : {
                variant: 'temporary',
                anchor: theme.direction === 'rtl' ? 'right' : 'left',
                open: mobileOpen,
                onClose: handleDrawerToggle,
                ModalProps: {
                  keepMounted: true
                }
              })}
        >
          {drawer}
        </Drawer>
      </Sidebar>
      <Main>
        <AppBar position="sticky" color="transparent">
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
          <Switch>
            <Route path="/" exact={true} component={Dashboard} />
            <Route path="/wallet" exact={true} component={Wallet} />
            <Route path="/transactions" exact={true} component={Transactions} />
            <Route path="/about" exact={true} component={About} />
          </Switch>
        </Content>
      </Main>
    </App>
  );
};
