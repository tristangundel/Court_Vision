import { RESET_ERRORS, GET_ERRORS } from "./actionTypes";

// Register User
export const resetErrors = () => (dispatch) => {
    dispatch({
        type: RESET_ERRORS
    });
};

export const setErrors = (errors) => (dispatch) => {
    dispatch({
        type: GET_ERRORS,
        payload: errors
    });
};