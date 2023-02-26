import React from 'react';
import { Container } from 'react-bootstrap';
import { HashRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import './App.css';


const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          {/* 
          <Route path='/' component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} /> 
          <Route path='/myprofile' component={RegisterScreen} /> 
          <Route path='/proposals' component={RegisterScreen} /> 
          <Route path='/proposals:id' component={RegisterScreen} /> 
          <Route path='/create-proposal' component={RegisterScreen} /> 
          <Route path='/view-members' component={RegisterScreen} /> 
          <Route path='/view-members:id' component={RegisterScreen} /> 
          */}
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
