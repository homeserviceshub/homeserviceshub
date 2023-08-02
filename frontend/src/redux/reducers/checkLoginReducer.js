const initialState = false;

const CheckLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECKLOGIN":
      return action.payload;
    default:
      return state;
  }
};

export default CheckLoginReducer;
