import axios from "axios";
import { setAlert } from "./alert";

import { GET_PROFILE, PROFILE_ERROR } from "./actionTypes";

// make request for backend to get User profiles
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
