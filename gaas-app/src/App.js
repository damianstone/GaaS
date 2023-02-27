import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import CreateProposal from './pages/createProposal/CreateProposal';

import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/create-proposal' component={CreateProposal} /> 
      </Switch>
    </Router>
  );
};

export default App;
