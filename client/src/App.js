import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Player from './components/Player';

function App() {
    return ( 
      <Router>
        <div>
          <NavBar / >
          <Route exact path='/' component={ HomePage } />
          <div id='container'>
            <Route exact path='/register' component={ Register } />
            <Route exact path='/login' component={ Login } />
            <Route exact path='/testplayer' component= { Player } />
          </div>
          <Footer />
        </div>
      </Router>
    );
}

export default App;