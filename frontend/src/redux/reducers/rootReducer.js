import { combineReducers } from "redux";
import reducer1 from "./reducer1";
import checkLoginReducer from "./checkLoginReducer";
import RemainingTasksReducer from "./remainingTasksReducer";
import authReducer from "./authReducer";
import userDataReducer from "./getUserDataReducer";
const rootReducer = combineReducers({
  reducer1,
  checkLoginReducer,
  RemainingTasksReducer,
  authReducer,
  userDataReducer,
});
export default rootReducer;
