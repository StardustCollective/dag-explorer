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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import * as Icon from '@material-ui/icons';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  App,
  Sidebar,
  Main,
  Content,
  ListItem,
  Shape,
  SidebarTop
} from './App.styled';
import { Logo } from '~assets';
import { Dashboard, Transactions, About } from '~pages';

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
      <SidebarTop>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Shape />
          <Box mt={1}>
            <Typography variant="subtitle2" noWrap>
              Welcome to your $DAG wallet
            </Typography>
          </Box>
        </Box>
      </SidebarTop>
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
          to="/transactions"
          selected={!!location.pathname.match(/^\/transactions/)}
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
