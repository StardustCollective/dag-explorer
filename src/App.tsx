import React from 'react';
import { Route, Switch } from 'react-router';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import * as Icon from '@material-ui/icons';
import {
  AppBar,
  Box,
  CssBaseline,
  Container,
  Drawer,
  IconButton,
  Link,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Typography,
  useMediaQuery
} from '@material-ui/core';
import {
  App,
  Sidebar,
  Main,
  Content,
  List,
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

  const nav = (
    <List horizontal={matchesSmUp}>
      <ListItem
        component={RouterLink}
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
        component={RouterLink}
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
  );

  return (
    <App>
      <CssBaseline />
      {!matchesSmUp && (
        <Sidebar>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true
            }}
          >
            <Box m={2}>
              <Link component={RouterLink} to="/" color="inherit">
                <Logo />
              </Link>
            </Box>
            {nav}
          </Drawer>
        </Sidebar>
      )}
      <Main>
        <AppBar position="sticky" color="inherit">
          <Container>
            <Box display="flex">
              <Box m={1}>
                <Link component={RouterLink} to="/" color="inherit">
                  <Logo />
                </Link>
              </Box>
              <Box ml="auto">
                {!matchesSmUp ? (
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                  >
                    <Icon.Menu />
                  </IconButton>
                ) : (
                  nav
                )}
              </Box>
            </Box>
          </Container>
        </AppBar>
        <Content>
          <Container>
            <Switch>
              <Route path="/" exact={true} component={Dashboard}></Route>
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
