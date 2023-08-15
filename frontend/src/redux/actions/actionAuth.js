// redux/actions.js
import axios from "axios";

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

const loginSuccess = (userId) => ({
  type: LOGIN_SUCCESS,
  payload: userId,
});

const logout = () => ({
  type: LOGOUT,
});

export const loginUser = (userId) => {
  // Save the userID to localStorage
  localStorage.setItem("userId", userId);
  return (dispatch) => {
    // Fetch user data based on userID and store it in the Redux store
    axios
      .get(`https://your-api-url.com/users/${userId}`)
      .then((response) => {
        // Assuming the response.data contains user data
        dispatch(loginSuccess(response.data));
      })
      .catch((error) => {
        // Handle error, if any
      });
  };
};

export const logoutUser = () => {
  // Remove the userID from localStorage
  localStorage.removeItem("userId");
  return (dispatch) => {
    // Clear the user data in the Redux store
    dispatch(logout());
  };
};
