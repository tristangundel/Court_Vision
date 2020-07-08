import { SET_CURRENT_USER } from '../actions/actionTypes';

// initial state of authentication is set to false
const initialState = {
    isAuthenticated: false,
    user: {}
};

// used to determine code execution for authorization actions
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !(Object.keys(action.payload).length === 0) && typeof(action.payload) === "object", 
                user: action.payload
            }
        default: {
            return state;
        }
    }
};

export default authReducer;