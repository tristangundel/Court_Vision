import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
} from "../actions/actionTypes";

const initalState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {}, // for an errors withn request
};

export default function (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        //response with profile
        profile: action.payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    default:
      return state;
  }
}
