import { combineReducers } from 'redux';
import authReducer from './authorization';
import errorReducer from './errors';

export default combineReducers({ 
    auth: authReducer,
    errors: errorReducer
});