import { createMuiTheme, Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#7BCFF6',
      light: '#7BCFF6',
      contrastText: '#FFF'
    },
    secondary: {
      light: '#A9D1A8',
      main: '#A9D1A8',
      contrastText: '#FFF'
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
      default: '#F2F2F2'
    }
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    htmlFontSize: 16,
    h4: {
      fontWeight: 200
    },
    h5: {
      fontWeight: 200
    }
  },
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: 'none',
        minWidth: '120px'
      }
    },
    MuiDrawer: {
      paperAnchorDockedLeft: {
        borderRight: 0
      },
      paper: {
        minWidth: '260px',
        color: '#949597',
        textTransform: 'uppercase',
        backgroundColor: '#212528',
        '.paperAnchorLeft': {
          borderRight: 0
        },
        '& .MuiListItemIcon-root': {
          color: 'inherit',
          margin: '0 1rem',
          minWidth: 'auto'
        },
        '& .MuiListItem-gutters': {
          padding: '0.5rem 0'
        },
        '& .MuiListItem-root.Mui-selected': {
          color: '#efefef'
        },
        '& .MuiDivider-root': {
          backgroundColor: 'currentColor',
          opacity: 0.3
        }
      }
    },
    MuiTableContainer: {
      root: {
        maxWidth: '100%'
      }
    },
    MuiTable: {
      root: {
        tableLayout: 'fixed'
      }
    },
    MuiTableCell: {
      sizeSmall: {
        maxWidth: 160
      },
      head: {
        background: '#F7F5F3',
        borderTop: '1px solid #F2EDE6',
        borderBottom: '1px solid #F2EDE6'
      }
    },
    MuiAppBar: {
      root: {
        background: '#F2F2F2'
      }
    }
  }
});

export default theme;
