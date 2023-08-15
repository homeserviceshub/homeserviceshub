import axios from "axios";

const USER_DETAILS = "USER_DETAILS";

const userData = (userId) => ({
  type: USER_DETAILS,
  payload: userId,
});

export const GetUserData = (userId) => {
  return (dispatch) => {
    // Fetch user data based on userID and store it in the Redux store
    axios
      .post("http://localhost:8000/userdata/", {
        _id: userId,
      })
      .then((response) => {
        // Assuming the response.data contains user data
        if (response.data.length > 0) {
          const newData = response.data[0]; // Assuming you want the first item from the array
          dispatch(userData(newData));
        }
      })
      .catch((error) => {
        // Handle error, if any
      });
  };
};
