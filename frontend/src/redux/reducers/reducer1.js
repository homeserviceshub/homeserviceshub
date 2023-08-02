// const initialState = [{ service: "serviceName", location: "location" }];
const initialState = "";

const Reducer1 = (state = initialState, action) => {
  switch (action.type) {
    case "SELECTEDSERVICE":
      return action.payload;
    default:
      return state;
  }
};

export default Reducer1;
