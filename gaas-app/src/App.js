import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/home/Home';

import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' component={Home} />
        {/* <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} /> 
          <Route path='/myprofile' component={RegisterScreen} /> 
          <Route path='/proposals' component={RegisterScreen} /> 
          <Route path='/proposals:id' component={RegisterScreen} /> 
          <Route path='/create-proposal' component={RegisterScreen} /> 
          <Route path='/view-members' component={RegisterScreen} /> 
          <Route path='/view-members:id' component={RegisterScreen} />  */}
      </Switch>
    </Router>
  );
};

export default App;
