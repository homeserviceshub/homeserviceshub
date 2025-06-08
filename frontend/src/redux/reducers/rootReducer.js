import { combineReducers } from "redux";
import Reducer1 from "./reducer1";
import CheckLoginReducer from "./checkLoginReducer";
import AceCheckLoginReducer from "./aceCheckLoginReducer";
import RemainingTasksReducer from "./remainingTasksReducer";
import authReducer from "./authReducer";
import userDataReducer from "./getUserDataReducer";
import AceServicesSelectReducer from "./aceServicesReducer";

const adminDataReducer = (
  state = {
    serviceRequests: [],
    customers: [],
    clients: [],
    reviews: [],
    subscriptions: null,
    customersStats: [],
    servicesStats: [],
    providersStats: [],
    registrationEarningsStats: [],
    subscriptionEarningsStats: [],
    subscribersStats: [],
  },
  action
) => {
  switch (action.type) {
    case "SET_ADMIN_DATA":
      return {
        ...state,
        [action.payload.endpoint.replace("stats/", "") + "Stats"]:
          action.payload.data,
      };
    default:
      return state;
  }
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_DETAILS":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  adminData: adminDataReducer,
  user: userReducer,
  selectedService: Reducer1,
  checkLoginReducer: CheckLoginReducer,
  AceCheckLoginReducer,
  RemainingTasksReducer,
  authReducer,
  userDataReducer,
  AceServicesSelectReducer,
});
