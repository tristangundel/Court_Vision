import axios from "axios";

import { GET_PROFILE, PROFILE_ERROR } from "./actionTypes";

// make request for backend to get User profiles
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/user/5f21fb404955fb658a2669b6");

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

// On this need to find a way to pass the user ID to get the correct dashboard
