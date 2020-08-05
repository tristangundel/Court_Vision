import { GET_ERRORS, RESET_ERRORS, REMOVE_ALERT } from "../actions/actionTypes";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ERRORS:
      return payload;
    case RESET_ERRORS:
      return [];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
