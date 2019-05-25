import React from 'react';
import moment from 'moment';

import reducer from 'reducer';
import { StateProvider } from 'context/State';

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
      App
    </StateProvider>
  );
}

export default App;
