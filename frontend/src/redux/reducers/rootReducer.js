import { combineReducers } from "redux";
import reducer1 from "./reducer1";
import checkLoginReducer from "./checkLoginReducer";
import RemainingTasksReducer from "./remainingTasksReducer";
import authReducer from "./authReducer";
import userDataReducer from "./getUserDataReducer";
import AceCheckLoginReducer from "./aceCheckLoginReducer";
import AceServicesSelectReducer from "./aceServicesReducer";
const rootReducer = combineReducers({
  reducer1,
  checkLoginReducer,
  AceCheckLoginReducer,
  RemainingTasksReducer,
  authReducer,
  userDataReducer,
  AceServicesSelectReducer,
});
export default rootReducer;
