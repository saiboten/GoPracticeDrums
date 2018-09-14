import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Wrapper from './components/Wrapper';
import Overview from './components/Overview';
import AddPractice from './components/AddPractice';
import Practice from './components/Practice';

export default function App() {
  return (
    <Provider store={store}>
      <Wrapper>
        <BrowserRouter>
          <Switch>
            <Route component={Overview} path="/" exact />
            <Route component={AddPractice} path="/addpractice" />
            <Route component={Practice} path="/practice/:date" />
          </Switch>
        </BrowserRouter>
      </Wrapper>
    </Provider>
  );
}
