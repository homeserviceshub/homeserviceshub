const initialState = false;

const AceCheckLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ACECHECKLOGIN":
      return action.payload;
    default:
      return state;
  }
};

export default AceCheckLoginReducer;
