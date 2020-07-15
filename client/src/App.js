import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./redux/actions/authActions";
import store from "./redux/store";
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
// import Footer from './components/Footer';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Player from "./components/Player";
import Team from "./components/Team";
import LeagueLeaders from "./components/LeagueLeaders";

function App() {
  // set current user if token exists in redux store
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    // decode token and get user info
    const decoded = jwt_decode(localStorage.jwtToken);
    // set current user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
  }

  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <NavBar />
          <Route exact path='/' component={HomePage} />
          <div id='container'>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/testplayer' component={Player} />
            <Route exact path='/team/:teamId' component={Team} />
            <Route exact path='/leagueleaders' component={LeagueLeaders} />
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
