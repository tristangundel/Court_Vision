import { GET_ERRORS } from '../actions/actionTypes';

// initial state of errors is set to empty object
const initialState = {};

// used with redux to retrieve errors and return them to local storage
const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ERRORS: 
            return action.payload;
        default:
            return state;
    }
};

export default errorReducer;