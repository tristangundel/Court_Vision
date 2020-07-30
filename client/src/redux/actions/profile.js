import axios from "axios";
import { GET_PROFILE, PROFILE_ERROR } from "./actionTypes";

// make request for backend to get User profiles
export const getCurrentProfile = (user) => async (dispatch) => {
  try {
    const url = "/api/profile/user/";
    const get_user = url + user;
    const res = await axios.get(get_user);

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
