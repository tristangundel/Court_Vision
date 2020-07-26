import { v4 as uuidv4 } from "uuid";
import { GET_ERRORS, REMOVE_ALERT } from "./actionTypes";

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  // creates random universal random id
  const id = uuidv4();
  dispatch({
    type: GET_ERRORS,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
