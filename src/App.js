import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { NotificationContainer } from 'react-light-notifications';
import 'config/moment';
import moment from 'moment';

import reducer from 'reducer';
import { StateProvider } from 'context/State';

import Layout from 'components/Layout';
import { fetchAllEvents } from 'actions/events';

import 'react-light-notifications/lib/main.css';
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
      selectedDate: null,
      weekView: false
    },
    events: fetchAllEvents(),
    form: {
      isHidden: true
    }
  };
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Layout />
        <NotificationContainer />
      </MuiThemeProvider>
    </StateProvider>
  );
}

export default App;
