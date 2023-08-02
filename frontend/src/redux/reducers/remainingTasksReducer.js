const initialState = 5;

const RemainingTasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REMAININGTASKS":
      return action.payload;
    default:
      return state;
  }
};

export default RemainingTasksReducer;
