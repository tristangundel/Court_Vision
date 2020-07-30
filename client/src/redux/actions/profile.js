import axios from "axios";
import { GET_PROFILE, PROFILE_ERROR } from "./actionTypes";

// make request for backend to get User profiles
export const getCurrentProfile = (user) => async (dispatch) => {
  try {
    // const res = await axios.get("/api/profile/user/5f2319e8ed1cf96908199c08");

    const res = await axios.get(
      "/api/profile/user/",
      (params: { user: "bar" })
    );

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
