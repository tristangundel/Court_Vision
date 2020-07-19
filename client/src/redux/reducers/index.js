import { combineReducers } from "redux";
import authReducer from "./authorization";
import errorReducer from "./errors";

// combines all reducers in application
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
});
