import React from 'react';
import moment from 'config/moment';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import reducer from 'reducer';
import { StateProvider } from 'context/State';

import 'typeface-roboto';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  },
  palette: {
    background: {
      default: '#fff'
    }
  }
});

function App() {
  const initialState = {
    calendar: {
      currentMoment: moment(),
      todayMoment: moment(),
      selectedDate: null
    }
  };
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        App
      </MuiThemeProvider>
    </StateProvider>
  );
}

export default App;
