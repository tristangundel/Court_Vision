import axios from "axios";
import { GET_PROFILE, PROFILE_ERROR } from "./actionTypes";

// make request for backend to get User profiles
export const getCurrentProfile = (user) => async (dispatch) => {
  try {
    const url = "/api/profile/user/";
    const get_user = url + user;
    const res = await axios.get(get_user);

    // console.log("This is the const url", url);
    // console.log("This is the const user", user);
    // console.log("This is the combined url", get_user);

    console.log("in profile.js after await");
    console.log("This is the user", user);

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
