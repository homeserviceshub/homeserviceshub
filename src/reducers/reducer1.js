const initialState = [{ username: "Harman Sidhu", email: "hrmn@gmail.com" }];

const Reducer1 = (state = initialState, action) => {
  switch (action.type) {
    case "SHOWMYNAME":
      return initialState;
    default:
      return state;
  }
};

export default Reducer1;
