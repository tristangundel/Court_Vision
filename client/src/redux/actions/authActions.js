import axios from 'axios';
import { GET_ERRORS } from './actionTypes';

// Register User
export const registerUser = (userData) => (dispatch) =>{
    axios.post('/api/users', userData)
        .then( res => {
            console.log(res.data);
            this.setState({redirect: "/login"});
            return res.json();
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })  
        );
}