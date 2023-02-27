import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import MyProfile from './pages/myprofile/MyProfile';

import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/myprofile' component={MyProfile} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
