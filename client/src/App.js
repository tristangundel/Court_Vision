import React, { component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./redux/actions/authActions";
import store from "./redux/store";
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PersonList from "./components/PersonList";

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
          </div>
          <PersonList />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
