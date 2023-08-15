// redux/reducer.js
const initialState = {
  data: localStorage.getItem("userId") || null,
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_DETAILS":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default userDataReducer;
