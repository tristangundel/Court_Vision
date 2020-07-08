import axios from 'axios';

// function to set Auth token to each request if token exists
const setAuthToken = token => {
    if (token) {
        //Apply to every request
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        // Delete the Auth Header
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;