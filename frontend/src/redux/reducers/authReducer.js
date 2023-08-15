// redux/reducer.js
const initialState = {
  userId: localStorage.getItem("userId") || null,
  userData: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        userId: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        userId: null,
        userData: null,
      };
    case "FETCH_USER_DATA_SUCCESS":
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
