import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#7BCFF5'
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      contrastText: '#ffcc00'
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
      default: '#F2F2F2'
    }
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    htmlFontSize: 16
  },
  overrides: {
    MuiDrawer: {
      paper: {
        minWidth: '260px',
        padding: '1rem',
        color: '#949597',
        backgroundColor: '#212528',
        '& .MuiListItemIcon-root': {
          color: 'inherit',
          marginRight: '0.5rem',
          minWidth: 'auto'
        },
        '& .MuiListItem-gutters': {
          padding: '0.5rem'
        },
        '& .MuiListItem-root.Mui-selected': {
          color: '#efefef'
        },
        '& .MuiDivider-root': {
          backgroundColor: 'currentColor',
          opacity: 0.3
        }
      }
    }
  }
});
