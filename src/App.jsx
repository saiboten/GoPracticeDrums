import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  ThemeProvider, theme, Grid,
} from '@smooth-ui/core-em';
import store from './store';
import Overview from './components/Overview';
import AddPractice from './components/AddPractice';
import Practice from './components/Practice';

import './index.css';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Grid md="true">
          <BrowserRouter>
            <Switch>
              <Route component={Overview} path="/" exact />
              <Route component={AddPractice} path="/addpractice" />
              <Route component={Practice} path="/practice/:created" />
            </Switch>
          </BrowserRouter>
        </Grid>
      </ThemeProvider>
    </Provider>
  );
}
