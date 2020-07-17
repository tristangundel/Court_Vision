import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from './actionTypes';

// Register User
export const registerUser = (userData, history) => dispatch =>{
    console.log(userData);
    axios.post('/api/users', userData)
        .then( res => {
            // if call is successful then redirect to the login page
            history.push('/login');
        })
        .catch(err => 
            // send errors to local redux storage
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })  
        );
}

// action to log in a user and then set current user 
export const loginUser = (userData, history) => dispatch => {
    axios.post('/api/auth', userData)
        .then(res => {
            // save token to local storage
            const { token } = res.data;
            // set token to ls
            localStorage.setItem('jwtToken', token);
            // set token to Auth header
            setAuthToken(token);
            // decode token to get user data
            const decoded = jwt_decode(token);
            // set current user
            dispatch(setCurrentUser(decoded));
            history.push("/");
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })  
        );
}

// set current user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER, 
        payload: decoded
    }
}

// log user out
export const userLogout = (history) => dispatch => {
    // remove token from localStorage
    localStorage.removeItem('jwtToken');
    // remove Auth header for future request
    setAuthToken(false);
    // set current user to empty object
    dispatch(setCurrentUser({}));
    history.push("/");
}