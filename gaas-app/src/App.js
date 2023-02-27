import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/home/Home';
import Login from './pages/login/Login';

import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        {/* 
          <Route path='/myprofile' component={RegisterScreen} /> 
          <Route path='/create-proposal' component={RegisterScreen} /> 
          <Route path='/view-members' component={RegisterScreen} /> 
          <Route path='/view-members:id' component={RegisterScreen} />  */}
      </Switch>
    </Router>
  );
};

export default App;
