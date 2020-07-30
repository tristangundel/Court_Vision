import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// 2 below are for redux
import { Provider } from "react-redux";
import store from "./redux/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./redux/actions/authActions";
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import createProfile from "./components/profile-form/createProfile";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
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
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={createProfile}
              />
              <Route exact path='/testplayer' component={Player} />
              <Route exact path='/player/:playerID' component={Player} />
              <Route exact path='/team/:teamID' component={Team} />
              <Route exact path='/leagueleaders' component={LeagueLeaders} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
