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

// action to create or update profile

// Currently there is an issue with this. I am not exact sure what it is
// I think it is not passing the auth-token ??
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    if (!edit) {
      history.push("/dashboard");
    }
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
