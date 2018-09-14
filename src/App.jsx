import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Wrapper from './components/Wrapper';
import Overview from './components/Overview';
import AddPractice from './components/AddPractice';


export default function App() {
  return (
    <Provider store={store}>
      <Wrapper>
        <BrowserRouter>
          <Switch>
            <Route component={Overview} path="/" exact />
            <Route component={AddPractice} path="/addpractice" />
          </Switch>
        </BrowserRouter>
      </Wrapper>
    </Provider>
  );
}
