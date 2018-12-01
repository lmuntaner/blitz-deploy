import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Feed from './Feed';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/feed" component={ Feed } />
    </Switch>
  </BrowserRouter>
);

export default App;
