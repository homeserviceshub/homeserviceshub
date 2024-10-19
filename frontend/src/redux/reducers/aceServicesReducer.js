const initialState = false;

const AceServicesSelectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ACESERVICESSELECT":
      return action.payload;
    default:
      return state;
  }
};

export default AceServicesSelectReducer;
