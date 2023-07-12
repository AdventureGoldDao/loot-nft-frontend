import { createTheme } from '@mui/material/styles';

export const BREAKPOINTS = {
  xs: 396,
  sm: 640,
  md: 768,
  lg: 1024,
  navSearchInputVisible: 1100,
  xl: 1280,
  xxl: 1536,
  xxxl: 1920,
}

export const customTheme = createTheme({
  palette: {
    primary: {
      main: '#A5FFBE',
    },
    error: {
      main: '#ff7d7d',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
        }
      },
    },
    MuiSelect: {
      styleOverrides: {
        // @ts-ignore
        root: {
          backgroundColor: 'rgba(165, 255, 190, 0.1)',
          borderRadius: '50px',
          color: '#fff',
          height: '28px',
          lineHeight: '28px'
        },
        select: {
          display: 'flex',
          alignItems: 'center',
        },
        icon: {
          color: '#A5FFBE'
        }
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: '#A5FFBE',
          background: '#000',
          padding: '13px',
          fontSize: '13px',
          fontFamily: 'Inconsolata',
          border: '1px solid #7A9283',
          borderRadius: '6px',
          boxShadow: '0px 4px 24px 0px rgba(165, 255, 190, 0.40)'
        },
        arrow: {
          color: '#000',
          '&::before': {
            border: '1px solid #7A9283'
          }
        }
      }
    }
  },
});
